import { bookEditions } from './book-editions.js'
import { bookUi, bookLocale, localizeBook } from './book-language.js'
export { bookEditions }
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
const words = text => [...segmenter.segment(text)].map(({ segment, isWordLike }) => isWordLike && segment.length > 1 && segment.length < 9 ? `<span class="poetry-word">${escape(segment)}</span>` : escape(segment)).join('')
const verse = (line, classical) => !bookLocale().id.startsWith('zh') ? escape(line) : classical ? (line.match(/[^，。！？；、]+[，。！？；、]?|[，。！？；、]/g) || [line]).map(part => part.length <= 13 ? `<span class="poetry-word">${escape(part)}</span>` : words(part)).join('') : words(line)
const heading = title => !bookLocale().id.startsWith('zh') ? escape(title) : title.includes('——') ? `${words(title.slice(0, title.indexOf('——')))}<span class="poem-subtitle">${words(title.slice(title.indexOf('——')))}</span>` : words(title)
const href = (book, poem) => `${book.path}/${poem.id}`
const date = poem => `<time datetime="${poem.date}">${poem.date.replaceAll('-', '.')}</time>`
const number = index => String(index + 1).padStart(2, '0')

function contents(book, active) {
  const groups = [...new Set(book.poems.map(poem => poem.volume || poem.date.slice(0, 4)))]
  return groups.map(group => `<section class="poetry-year"><h3>${group}</h3><ol>${book.poems.map((poem, index) => (poem.volume || poem.date.slice(0, 4)) === group ? `<li><a class="internal-link" href="${href(book, poem)}"${active === poem.id ? ' aria-current="page"' : ''}><span class="poetry-number" aria-hidden="true">${number(index)}</span><span>${escape(poem.title)}</span>${date(poem)}</a></li>` : '').join('')}</ol></section>`).join('')
}

export function poetryView(source) {
  const book = localizeBook(source), ui = bookUi(), locale = bookLocale()
  return `<section class="poetry-book${book.title.length > 24 ? ' poetry-long-title' : ''}" lang="${locale.lang}" dir="${locale.dir || 'ltr'}">
    <a class="poetry-back internal-link" href="/books">${locale.dir === 'rtl' ? '→' : '←'} ${ui.books}</a>
    <header class="poetry-frontispiece">
      ${book.cover ? `<img class="poetry-book-cover" src="${book.cover}" width="900" height="1200" alt="${escape(book.title)} · ${ui.cover}" decoding="async" />` : `<div class="poetry-title-leaf" aria-hidden="true" lang="zh-Hans"><span>一念凡生</span><small>光之十一</small></div>`}
      <div><p class="poetry-kicker">${book.category} · <bdi>${book.years}</bdi></p><h1>${escape(book.title)}</h1><p class="poetry-author">${ui.author}${locale.id.startsWith('zh') ? ' 著' : ''}</p><p class="poetry-intro">${book.intro}</p><div class="poetry-actions"><a class="poetry-start internal-link" href="${href(book, book.poems[0])}">${ui.start} <span aria-hidden="true">→</span></a>${book.external ? `<a class="poetry-external" href="${book.external}" target="_blank" rel="noopener">${ui.qidian} <span aria-hidden="true">↗</span></a>` : ''}</div></div>
    </header>
    <section class="poetry-contents" id="contents" aria-labelledby="poetry-contents-title"><div class="poetry-contents-heading"><h2 id="poetry-contents-title">${ui.contents}</h2><span>${book.poems.length} ${ui.works} · <bdi>${book.years}</bdi></span></div>${contents(book)}</section>
  </section>`
}

export function poemView(source, original) {
  const book = localizeBook(source), poem = book.poems.find(item => item.id === original.id), ui = bookUi(), locale = bookLocale()
  const index = book.poems.indexOf(poem)
  return `<section class="poetry-reader${poem.volume ? ' poetry-ci' : ''}" lang="${locale.lang}" dir="${locale.dir || 'ltr'}">
    <a class="poetry-back internal-link" href="${book.path}">${locale.dir === 'rtl' ? '→' : '←'} ${book.title}</a>
    <div class="poetry-reading-layout">
      <details class="poetry-reader-directory"><summary>${ui.contents} <span aria-hidden="true">＋</span></summary><nav aria-label="${ui.directory}">${contents(book, poem.id)}</nav></details>
      <article class="poetry-page">
        <header class="poem-heading"><p class="poetry-kicker">${book.title}${poem.volume ? ' · '+poem.volume : ''} · <bdi>${number(index)} / ${book.poems.length}</bdi></p><h1>${heading(poem.title)}</h1><p class="poem-byline"><span>${ui.author}</span><span class="poem-meta-separator" aria-hidden="true">·</span>${date(poem)}</p></header>
        ${poem.image ? `<figure class="poem-illustration"><img src="${poem.image.src}" width="${poem.image.width}" height="${poem.image.height}" alt="${escape(poem.title)} · ${ui.illustration}" decoding="async" /></figure>` : ''}
        <div class="poem-verses">${poem.stanzas.map(stanza => `<p class="poem-stanza">${stanza.map(line => `<span class="poem-line">${verse(line, !!poem.volume)}</span>`).join('')}</p>`).join('')}</div>
        ${poem.notes?.length ? `<section class="poem-notes">${poem.notes.map(stanza => `<p>${stanza.map(escape).join('<br>')}</p>`).join('')}</section>` : ''}
        ${poem.credit ? `<p class="poem-credit">${escape(poem.credit)}</p>` : ''}
        <nav class="poem-pagination" aria-label="${ui.browse}">${index > 0 ? `<a class="internal-link" href="${href(book, book.poems[index - 1])}"><small>${locale.dir === 'rtl' ? '→' : '←'} ${ui.previous}</small><span>${escape(book.poems[index - 1].title)}</span></a>` : '<span></span>'}<a class="poem-return internal-link" href="${book.path}#contents">${ui.contents}</a>${index < book.poems.length - 1 ? `<a class="poem-next internal-link" href="${href(book, book.poems[index + 1])}"><small>${ui.next} ${locale.dir === 'rtl' ? '←' : '→'}</small><span>${escape(book.poems[index + 1].title)}</span></a>` : '<span></span>'}</nav>
      </article>
    </div>
  </section>`
}

let cleanup = () => {}
export function bindPoetry() {
  cleanup()
  const directory = document.querySelector('.poetry-reader-directory')
  if (!directory) { cleanup = () => {}; return }
  const desktop = matchMedia('(min-width: 1000px)')
  const sync = () => {
    directory.open = desktop.matches
    if (desktop.matches) {
      const active = directory.querySelector('[aria-current]')
      if (active) directory.scrollTop = Math.max(0, active.offsetTop - directory.offsetTop - 100)
    }
  }
  sync()
  desktop.addEventListener('change', sync)
  cleanup = () => desktop.removeEventListener('change', sync)
}
