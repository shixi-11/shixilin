import assert from 'node:assert/strict'
import { messages } from '../src/messages.js'

const expected = Object.keys(messages.zh).sort()
for (const [locale, copy] of Object.entries(messages)) {
  assert.deepEqual(Object.keys(copy).sort(), expected, `Key coverage: ${locale}`)
  for (const [key, value] of Object.entries(copy)) {
    assert.equal(typeof value, 'string', `${locale}:${key}`)
    assert.ok(value.trim(), `Empty translation: ${locale}:${key}`)
    assert.ok(!value.includes('undefined'), `${locale}:${key}`)
  }
}
assert.equal(Object.keys(messages).length, 8)
assert.equal(messages.zh['home.intro1'], '在技术与人文之间，寻找安静的连接。')
assert.equal(messages.zh['home.intro2'], '写诗词与小说，也做AI产品和独立游戏。')
for (const locale of ['zh', 'zh-Hant']) assert.equal(messages[locale]['about.companyName'], '十一資本')
for (const key of ['home.moheText', 'work.mohe.text', 'work.mohe.alt']) assert.ok(!/\b(he|him|his|himself)\b/i.test(messages.en[key]))

// Exercise share links, refresh, stored preference and back navigation without a browser dependency.
globalThis.location = { origin: 'https://shixilin.com', search: '' }
const values = new Map()
globalThis.localStorage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) }
const { getLocale, syncLocale, setLocale, localizedHref, locales } = await import('../src/i18n.js')
assert.equal(getLocale(), 'zh')
assert.deepEqual(locales.map(item => item.id), ['zh', 'zh-Hant', 'en', 'ja', 'ko', 'fr', 'de', 'ar'])
setLocale('ja')
assert.equal(localizedHref('/about#contact'), '/about?lang=ja#contact')
assert.equal(syncLocale(), 'ja')
location.search = '?lang=ar'
assert.equal(syncLocale(), 'ar')
location.search = '?lang=zh'
assert.equal(syncLocale(), 'zh')
location.search = '?lang=invalid'
assert.equal(syncLocale(), 'zh')
location.search = ''
localStorage.getItem = () => { throw new Error('Storage unavailable') }
localStorage.setItem = () => { throw new Error('Storage unavailable') }
assert.equal(syncLocale(), 'zh')
assert.equal(setLocale('fr'), 'fr')
assert.equal(localizedHref('/games?ref=card'), '/games?ref=card&lang=fr')
console.log(`8 locales × ${expected.length} keys; Chinese baseline, proper names, URL/state behavior and Mohe pronouns verified.`)
