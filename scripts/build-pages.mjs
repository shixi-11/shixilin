import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { messages } from '../src/messages.js'

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
    .replace(/(<meta property="og:image:width" content=")[^"]*/, `$1${key === 'inkDuel' ? '1672' : '1200'}`)
    .replace(/(<meta property="og:image:height" content=")[^"]*/, `$1${key === 'inkDuel' ? '941' : key === 'baishishu' ? '675' : '630'}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonicalUrl}`)
  const directory = new URL(`../dist/${page}/`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}
