import { messages } from './messages.js'
import { browserLocale } from '../lib/locale-detection.js'

export const locales = [
  { id: 'zh', lang: 'zh-Hans', name: '简体中文', short: '简体' },
  { id: 'zh-Hant', lang: 'zh-Hant', name: '繁體中文', short: '繁體' },
  { id: 'en', lang: 'en', name: 'English', short: 'EN' },
  { id: 'ja', lang: 'ja', name: '日本語', short: '日本語' },
  { id: 'ko', lang: 'ko', name: '한국어', short: '한국어' },
  { id: 'es', lang: 'es', name: 'Español', short: 'ES' },
  { id: 'fr', lang: 'fr', name: 'Français', short: 'FR' },
  { id: 'de', lang: 'de', name: 'Deutsch', short: 'DE' },
  { id: 'ar', lang: 'ar', name: 'العربية', short: 'العربية', dir: 'rtl' },
]
const valid = value => locales.some(locale => locale.id === value)
const localesByLongestId = [...locales].sort((a, b) => b.id.length - a.id.length)
let currentLocale = 'zh'
let automaticLocale = 'en'

export function splitLocalePath(pathname = '/') {
  const trimmed = String(pathname).replace(/\/+$/, '') || '/'
  for (const locale of localesByLongestId) {
    const prefix = `/${locale.id}`
    if (trimmed === prefix) return { locale: locale.id, path: '/' }
    if (trimmed.startsWith(`${prefix}/`)) return { locale: locale.id, path: trimmed.slice(prefix.length) }
  }
  return { locale: null, path: trimmed }
}

function preferredLocale() {
  const query = new URLSearchParams(location.search).get('lang')
  if (query !== null) return valid(query) ? query : 'zh'
  const { locale } = splitLocalePath(location.pathname)
  if (locale) return locale
  let saved
  try { saved = localStorage.getItem('shixilin-locale') } catch { /* Private browsing may disable storage. */ }
  return valid(saved) ? saved : null
}

function detectedBrowserLocale() {
  return browserLocale(globalThis.navigator?.languages || [globalThis.navigator?.language])
}

export function syncLocale() {
  currentLocale = preferredLocale() || detectedBrowserLocale() || automaticLocale
  return currentLocale
}
syncLocale()

export async function initializeLocale() {
  automaticLocale = 'en'
  if (!preferredLocale() && !detectedBrowserLocale()) {
    try {
      const response = await fetch('/api/visitor-locale', { cache: 'no-store', signal: AbortSignal.timeout(1200) })
      if (response.ok) {
        const { locale } = await response.json()
        if (valid(locale)) automaticLocale = locale
      }
    } catch { /* An unavailable country lookup must not prevent the page from loading. */ }
  }
  syncLocale()
  const url = new URL(location.href)
  const { path } = splitLocalePath(url.pathname)
  url.pathname = path
  if (!url.searchParams.has('lang')) url.searchParams.set('lang', currentLocale)
  const next = `${url.pathname}${url.search}${url.hash}`
  if (next !== `${location.pathname}${location.search}${location.hash}`) {
    history.replaceState(history.state, '', next)
  }
}

export function getLocale() {
  return currentLocale
}

export function t(key) {
  return messages[currentLocale][key] || messages.zh[key] || key
}

export function setLocale(locale) {
  currentLocale = valid(locale) ? locale : 'zh'
  try { localStorage.setItem('shixilin-locale', currentLocale) } catch { /* URL still preserves the language. */ }
  return currentLocale
}

export function localizedHref(href) {
  const url = new URL(href, location.origin)
  url.pathname = splitLocalePath(url.pathname).path
  url.searchParams.set('lang', currentLocale)
  return `${url.pathname}${url.search}${url.hash}`
}
