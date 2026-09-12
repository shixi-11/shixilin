import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { bookEditions } from '../src/book-editions.js'
import { keys, copy, descriptions } from '../src/book-copy.js'

const locales = ['zh', 'zh-Hant', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ar']
assert.deepEqual(Object.keys(copy).sort(), [...locales].sort())
for (const locale of locales) {
  assert.equal(copy[locale].length, keys.length, `Book UI coverage: ${locale}`)
  assert.equal(descriptions[locale].length, 8, `Book metadata coverage: ${locale}`)
  assert.ok([...copy[locale], ...descriptions[locale]].every(value => typeof value === 'string' && value.trim()), `Empty UI: ${locale}`)
}
const source = Object.fromEntries(bookEditions.flatMap(book => book.poems.map(poem => [`${book.path.split('/').pop()}/${poem.id}`, poem])))
for (const locale of locales.filter(id => id !== 'zh')) {
  const translated = JSON.parse(await readFile(new URL(`../src/book-translations/${locale}.json`, import.meta.url), 'utf8'))
  assert.deepEqual(Object.keys(translated).sort(), Object.keys(source).sort(), `Poem coverage: ${locale}`)
  for (const [id, original] of Object.entries(source)) {
    const poem = translated[id]
    assert.ok(poem.title?.trim(), `Title: ${locale}/${id}`)
    assert.ok(Object.keys(poem).every(key => ['title', 'stanzas', 'notes', 'credit'].includes(key)), `Unexpected fields: ${locale}/${id}`)
    for (const field of ['stanzas', 'notes']) {
      assert.deepEqual((poem[field] || []).map(stanza => stanza.length), (original[field] || []).map(stanza => stanza.length), `Line/stanza fidelity: ${locale}/${id}/${field}`)
      assert.ok((poem[field] || []).flat().every(line => typeof line === 'string' && line.trim()), `Empty text: ${locale}/${id}/${field}`)
    }
    if (original.credit) assert.ok(poem.credit?.trim(), `Attribution: ${locale}/${id}`)
  }
}
console.log(`132 poems × 8 translations: titles, verse lines, notes and attribution complete; 9 book interfaces verified.`)
