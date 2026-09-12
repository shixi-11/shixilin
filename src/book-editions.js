import { poems } from './poems.js'
import { yinianPoems } from './yinian-poems.js'

export const bookEditions = [
  { path: '/books/still-untitled', title: '还没取名儿呢', category: '现代诗集', years: '2018–2026', intro: '收录2018–2026年的现代诗，写身体、关系、远行，以及变化如何重新塑造一个人。', cover: '/assets/poetry/cover.jpg', poems },
  { path: '/books/yinian', title: '一念凡生', category: '古词牌集', years: '2012–2026', volumes: '我本顽痴 · 上下通圆', intro: '依新韵十三辙填词，记录行路心迹与当下情思。收录2012–2026年的词作，分为“我本顽痴”与“上下通圆”两卷，附创作日期与释义。', external: 'https://www.qidian.com/book/1025472585/', poems: yinianPoems },
]
