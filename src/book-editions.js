import { descriptions } from './book-copy.js'
import { poems } from './poems.js'
import { yinianPoems } from './yinian-poems.js'

export const bookEditions = [
  { path: '/books/still-untitled', title: '还没取名儿呢', category: '现代诗集', intro: descriptions.zh[4], cover: '/assets/poetry/cover.jpg', poems },
  { path: '/books/yinian', title: '一念凡生', category: '古词牌集', volumes: '我本顽痴 · 上下通圆', intro: descriptions.zh[5], external: 'https://www.qidian.com/book/1025472585/', poems: yinianPoems },
]
