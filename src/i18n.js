import { messages } from './messages.js'

export const locales = [
  { id: 'zh', lang: 'zh-Hans', name: '简体中文', short: '简体' },
  { id: 'zh-Hant', lang: 'zh-Hant', name: '繁體中文', short: '繁體' },
  { id: 'en', lang: 'en', name: 'English', short: 'EN' },
  { id: 'ja', lang: 'ja', name: '日本語', short: '日本語' },
  { id: 'ko', lang: 'ko', name: '한국어', short: '한국어' },
  { id: 'fr', lang: 'fr', name: 'Français', short: 'FR' },
  { id: 'de', lang: 'de', name: 'Deutsch', short: 'DE' },
  { id: 'ar', lang: 'ar', name: 'العربية', short: 'العربية', dir: 'rtl' },
]
const valid = value => locales.some(locale => locale.id === value)
let currentLocale = 'zh'

export function syncLocale() {
  const query = new URLSearchParams(location.search).get('lang')
  let saved
  try { saved = localStorage.getItem('shixilin-locale') } catch { /* Private browsing may disable storage. */ }
  currentLocale = query !== null ? (valid(query) ? query : 'zh') : (valid(saved) ? saved : 'zh')
  return currentLocale
}
syncLocale()

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
  url.searchParams.set('lang', currentLocale)
  return `${url.pathname}${url.search}${url.hash}`
}
