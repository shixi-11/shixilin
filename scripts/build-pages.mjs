import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { messages } from '../src/messages.js'
import { bookEditions } from '../src/book-editions.js'

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const [page, key, image] of [
  ['ai', 'ai'], ['games', 'games'], ['books', 'books'], ['design', 'design'], ['about', 'about'], ['services', 'services'], ['support', 'support'],
  ['games/ink-duel', 'inkDuel', '/assets/ink-duel-concept.png'],
  ['games/baishishu', 'baishishu', '/assets/baishishu-opening.jpg'],
]) {
  const title = escape(messages.zh[`meta.${key}`])
  const description = escape(messages.zh[`meta.${key}Description`])
  const canonicalUrl = `https://shixilin.com/${page}`
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonicalUrl}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, (match, prefix) => image ? `${prefix}https://shixilin.com${image}` : match)
    .replace(/(<meta property="og:image:alt" content=")[^"]*/, (match, prefix) => image ? `${prefix}${title}` : match)
    .replace(/(<meta property="og:image:width" content=")[^"]*/, `$1${key === 'inkDuel' ? '1672' : '1200'}`)
    .replace(/(<meta property="og:image:height" content=")[^"]*/, `$1${key === 'inkDuel' ? '941' : key === 'baishishu' ? '675' : '630'}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonicalUrl}`)
  const directory = new URL(`../dist/${page}/`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}

// Each book and poem has its own shareable URL and readable static content.
for (const book of bookEditions) {
  const entries = [{ path: book.path, title: book.title, description: book.intro.replace(/\n+/g, ' '), image: book.cover, width: 900, height: 1200,
    body: `<h1>${escape(book.title)}</h1><p>光之十一</p><ol>${book.poems.map(poem => `<li><a href="${book.path}/${poem.id}">${escape(poem.title)}</a> <time datetime="${poem.date}">${poem.date}</time></li>`).join('')}</ol>` },
  ...book.poems.map(poem => ({ path: `${book.path}/${poem.id}`, title: `${poem.title} · ${book.title}`, description: poem.stanzas[0].join(''), image: poem.image?.src || book.cover, width: poem.image?.width || 900, height: poem.image?.height || 1200,
    body: `<a href="${book.path}">${escape(book.title)}</a><h1>${escape(poem.title)}</h1><p>光之十一 · <time datetime="${poem.date}">${poem.date}</time></p>${poem.image ? `<img src="${poem.image.src}" width="${poem.image.width}" height="${poem.image.height}" alt="${escape(poem.title)}" style="max-width:100%;height:auto">` : ''}${poem.stanzas.map(stanza => `<p>${stanza.map(escape).join('<br>')}</p>`).join('')}${(poem.notes || []).map(stanza => `<p>${stanza.map(escape).join('<br>')}</p>`).join('')}${poem.credit ? `<p>${escape(poem.credit)}</p>` : ''}` }))]
  for (const entry of entries) {
    const title = escape(`${entry.title} · 光之十一`)
    const description = escape(entry.description)
    const url = `https://shixilin.com${entry.path}`
    const image = entry.image || '/assets/og-shixilin.jpg?v=20260906'
    const html = template
      .replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, (_, prefix) => prefix + description)
      .replace(/(<meta property="og:title" content=")[^"]*/, (_, prefix) => prefix + title)
      .replace(/(<meta property="og:description" content=")[^"]*/, (_, prefix) => prefix + description)
      .replace(/(<meta property="og:url" content=")[^"]*/, (_, prefix) => prefix + url)
      .replace(/(<meta property="og:image" content=")[^"]*/, (_, prefix) => prefix + `https://shixilin.com${image}`)
      .replace(/(<meta property="og:image:alt" content=")[^"]*/, (_, prefix) => prefix + title)
      .replace(/(<meta property="og:image:width" content=")[^"]*/, (_, prefix) => prefix + (entry.image ? entry.width : 1200))
      .replace(/(<meta property="og:image:height" content=")[^"]*/, (_, prefix) => prefix + (entry.image ? entry.height : 630))
      .replace(/(<link rel="canonical" href=")[^"]*/, (_, prefix) => prefix + url)
      .replace('<div id="app"></div>', () => `<div id="app"><main class="quiet-page" lang="zh-CN" dir="ltr">${entry.body}</main></div>`)
    const directory = new URL(`../dist${entry.path}/`, import.meta.url)
    await mkdir(directory, { recursive: true })
    await writeFile(new URL('index.html', directory), html)
  }
}
