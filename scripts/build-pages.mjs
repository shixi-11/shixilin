import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { messages } from '../src/messages.js'

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const page of ['works', 'ai', 'books']) {
  const title = escape(messages.zh[`meta.${page}`])
  const description = escape(messages.zh[`meta.${page}Description`])
  const canonicalPage = page === 'ai' ? 'works' : page
  const canonicalUrl = `https://shixilin.com/${canonicalPage}`
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonicalUrl}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonicalUrl}`)
  const directory = new URL(`../dist/${page}/`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}
