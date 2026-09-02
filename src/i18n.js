import { messages } from './messages.js'

let currentLocale = localStorage.getItem('shixilin-locale') === 'en' ? 'en' : 'zh'

export function getLocale() {
  return currentLocale
}

export function t(key) {
  return messages[currentLocale][key] || messages.zh[key] || key
}

export function toggleLocale() {
  currentLocale = currentLocale === 'zh' ? 'en' : 'zh'
  localStorage.setItem('shixilin-locale', currentLocale)
  return currentLocale
}
