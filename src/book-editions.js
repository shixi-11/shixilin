import { poems } from './poems.js'
import { yinianPoems } from './yinian-poems.js'

export const bookEditions = [
  { path: '/books/still-untitled', title: '还没取名儿呢', category: '现代诗集', years: '2018–2026', intro: '收录2018–2026年的现代诗，写身体、关系、远行，以及变化如何重新塑造一个人。', cover: '/assets/poetry/cover.jpg', poems },
  { path: '/books/yinian', title: '一念凡生', category: '古词牌集', years: '2012–2026', intro: '我本顽痴 · 上下通圆', poems: yinianPoems },
]
