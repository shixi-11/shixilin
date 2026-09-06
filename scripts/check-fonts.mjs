import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { fontCorpus } from './font-corpus.mjs'

const coverage = JSON.parse(await readFile(new URL('./font-coverage.json', import.meta.url), 'utf8'))
const fonts = coverage.fonts
for (const [name, font] of Object.entries(fonts)) {
  const bytes = await readFile(new URL(`../public/fonts/${name}`, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), font.sha256, `Stale font coverage: ${name}`)
}
const corpus = [...await fontCorpus()]
const css = (await Promise.all(['styles.css', 'locales.css'].map(name => readFile(new URL(`../src/${name}`, import.meta.url), 'utf8')))).join('\n')
for (const [name, font] of Object.entries(fonts)) {
  assert.ok(css.includes(`/fonts/${name}?v=${font.sha256.slice(0, 12)}`), `Stale font URL: ${name}`)
}
const symbolCoverage = new Set(Object.values(fonts).map(font => font.characters).join(''))
const missingSymbols = corpus.filter(character => /[\u2000-\u206f\u2190-\u21ff\u3000-\u303f\uff01-\uff60]/u.test(character) && !symbolCoverage.has(character))
assert.equal(missingSymbols.length, 0, `Missing punctuation or arrows: ${missingSymbols.join('')}`)
const scripts = [
  ['noto-serif-sc.woff2', /\p{Script=Han}/u],
  ['noto-serif-tc.woff2', /\p{Script=Han}/u],
  ['noto-serif-jp.woff2', /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u],
  ['noto-serif-kr.woff2', /[\p{Script=Han}\p{Script=Hangul}]/u],
  ['noto-naskh-arabic.woff2', /\p{Script=Arabic}/u],
  ['source-serif-4.woff2', /[\p{Script=Latin}0-9]/u],
  ['source-sans-3.woff2', /[\p{Script=Latin}0-9]/u],
]
for (const [name, script] of scripts) {
  // Regional Noto faces intentionally fall back to SC for shared simplified
  // names; this must stay within our shipped serif family, never the OS font.
  const fallback = /^noto-serif-(tc|jp|kr)/.test(name) ? fonts['noto-serif-sc.woff2'].characters : ''
  const characters = new Set(fonts[name].characters + fallback)
  const missing = corpus.filter(character => script.test(character) && !characters.has(character))
  assert.equal(missing.length, 0, `${name} lacks ${missing.join('')}. Rebuild the web fonts before publishing new copy.`)
}
console.log('7 web-font files verified; current CJK, Arabic and Latin copy has matching glyph coverage.')
