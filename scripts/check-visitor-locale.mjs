import assert from 'node:assert/strict'
import { browserLocale, countryLocale } from '../lib/locale-detection.js'
import handler from '../api/visitor-locale.js'

for (const [languages, expected] of [
  [['ja-JP', 'en-US'], 'ja'], [['pt-BR', 'es-MX', 'en'], 'es'],
  [['zh-TW'], 'zh-Hant'], [['zh-HK'], 'zh-Hant'], [['zh-Hans-HK'], 'zh'],
  [['zh-Hant-CN'], 'zh-Hant'], [['de-CH'], 'de'], [['pt-BR'], null],
]) assert.equal(browserLocale(languages), expected)
for (const [country, expected] of [['CN', 'zh'], ['HK', 'zh-Hant'], ['JP', 'ja'], ['MX', 'es'], ['FR', 'fr'], ['AE', 'ar'], ['US', 'en'], [undefined, 'en']]) {
  assert.equal(countryLocale(country), expected)
  const headers = {}
  const response = { setHeader: (key, value) => { headers[key] = value }, status(code) { this.code = code; return this }, json(body) { this.body = body } }
  handler({ method: 'GET', headers: { 'x-vercel-ip-country': country } }, response)
  assert.equal(response.code, 200)
  assert.deepEqual(response.body, { locale: expected })
  assert.equal(headers['Cache-Control'], 'private, no-store')
}

let saved = null
globalThis.localStorage = { getItem: () => saved, setItem: (_, value) => { saved = value } }
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { languages: [] } })
globalThis.location = new URL('https://shixilin.com/books?ref=share#poems')
globalThis.history = { state: { keep: true }, replaceState(state, _, href) { assert.deepEqual(state, { keep: true }); globalThis.location = new URL(href, location.origin) } }
const { initializeLocale, getLocale } = await import('../src/i18n.js')
for (const scenario of [
  { query: '&lang=ar', saved: 'ja', languages: ['en-US'], expected: 'ar' },
  { saved: 'fr', languages: ['ja-JP'], expected: 'fr' },
  { languages: ['zh-TW'], expected: 'zh-Hant' },
  { languages: ['pt-BR'], country: 'JP', expected: 'ja', lookup: true },
  { languages: [], country: 'CN', expected: 'zh', lookup: true },
  { languages: ['pt-BR'], fail: true, expected: 'en', lookup: true },
]) {
  saved = scenario.saved || null
  navigator.languages = scenario.languages
  globalThis.location = new URL('https://shixilin.com/books?ref=share' + (scenario.query || '') + '#poems')
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.equal(url, '/api/visitor-locale')
    assert.equal(options.cache, 'no-store')
    if (scenario.fail) throw new Error('Unavailable')
    return { ok: true, json: async () => ({ locale: countryLocale(scenario.country) }) }
  }
  await initializeLocale()
  assert.equal(getLocale(), scenario.expected)
  assert.equal(calls, scenario.lookup ? 1 : 0)
  assert.equal(location.searchParams.get('lang'), scenario.expected)
  assert.equal(location.searchParams.get('ref'), 'share')
  assert.equal(location.hash, '#poems')
  assert.equal(saved, scenario.saved || null, 'Automatic detection must not overwrite a manual preference')
}
console.log('Visitor language: URL/preference/browser/country priority, script variants, private responses and lookup failure verified.')
