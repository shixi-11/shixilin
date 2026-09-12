import { readFile, readdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { messages } from '../src/messages.js'

// Include translated copy and literal component text. New names, captions and
// products must participate in font coverage, not just the initial home page.
export async function fontCorpus() {
  const text = Object.values(messages).flatMap(locale => Object.values(locale))
  if (text.some(value => typeof value !== 'string')) throw new Error('Locale copy must be flat strings')
  for (const entry of await readdir(new URL('../src/', import.meta.url), { recursive: true })) {
    if (/\.(js|css|json)$/.test(entry) && entry !== 'messages.js') {
      text.push(await readFile(new URL(`../src/${entry.replaceAll('\\', '/')}`, import.meta.url), 'utf8'))
    }
  }
  text.push(await readFile(new URL('../index.html', import.meta.url), 'utf8'))
  return [...new Set(text.join('\n'))].sort((a, b) => a.codePointAt(0) - b.codePointAt(0)).join('')
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv[2]) {
  await writeFile(process.argv[2], await fontCorpus())
}
