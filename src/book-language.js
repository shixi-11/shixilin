import { getLocale, locales } from './i18n.js'
import { keys, copy, descriptions } from './book-copy.js'

const imports = import.meta.glob('./book-translations/*.json', { import: 'default' })
const translations = new Map()
const editions = new Map()
export const bookUi = () => Object.fromEntries(keys.map((key,index) => [key,copy[getLocale()][index]]))
export const bookLocale = () => locales.find(locale => locale.id === getLocale())
export async function loadBookLocale(locale) {
  if (locale === 'zh' || translations.has(locale)) return
  const loader = imports[`./book-translations/${locale}.json`]
  if (!loader) throw new Error(`Missing book translations: ${locale}`)
  translations.set(locale, await loader())
}
export function localizeBook(source) {
  const locale = getLocale()
  if (locale === 'zh') return source
  const key = `${source.path}:${locale}`
  if (editions.has(key)) return editions.get(key)
  const text = descriptions[locale]
  const classical = source.path.endsWith('/yinian')
  const data = translations.get(locale)
  if (!data) throw new Error(`Book translations not loaded: ${locale}`)
  const book = {...source, title: text[classical ? 1 : 0], category: text[classical ? 3 : 2], intro: text[classical ? 5 : 4], poems: source.poems.map(poem => {
    const translated = data[`${source.path.split('/').pop()}/${poem.id}`]
    if (!translated) throw new Error(`Missing translated poem: ${locale}/${poem.id}`)
    return {...poem,...translated, ...(poem.volume ? {volume:text[poem.volume === '我本顽痴' ? 6 : 7]} : {})}
  })}
  editions.set(key,book)
  return book
}
export function bookPageMeta(source, original) {
  const book = localizeBook(source)
  const poem = original && book.poems.find(item => item.id === original.id)
  return {title: `${poem ? poem.title+' · ' : ''}${book.title} · ${bookUi().author}`,description: poem ? poem.stanzas[0].join(' ') : book.intro.replace(/\n+/g, ' ')}
}
