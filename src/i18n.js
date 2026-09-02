const messages = {
  zh: {
    'meta.home': '光之十一｜独立产品与文字作品',
    'meta.ai': 'AI产品｜光之十一',
    'meta.books': '书籍｜光之十一',
    'meta.homeDescription': '光之十一的个人作品集，浏览AI产品、书籍与创作。',
    'meta.aiDescription': '了解光之十一创作的AI产品，包括以云的照片为灵感的文字创作工具云笺。',
    'meta.booksDescription': '光之十一的书稿、出版信息与延伸阅读。',
    'brand.homeLabel': '返回光之十一首页',
    'nav.ai': 'AI产品',
    'nav.books': '书籍',
    'nav.about': '关于',
    'nav.menu': '目录',
    'language.label': 'Switch to English',
    'language.short': 'EN',
    'footer.tagline': '独立产品与文字作品',
    'hero.products': '独立产品',
    'hero.writing': '文字作品',
    'hero.label': '个人作品集',
    'hero.lead': '浏览AI产品，了解书籍与创作。',
    'hero.action': '查看AI产品',
    'work.title': '探索作品',
    'books.cardCategory': '书籍',
    'books.cardTitle': '书籍与阅读',
    'books.cardDescription': '书稿、出版信息与延伸阅读。',
    'books.enter': '查看书籍',
    'about.title': '光之十一',
    'about.p1': '我是光之十一，一名独立创作者。我做AI产品，也写书，关注技术与人文的交会。',
    'ai.title': 'AI产品',
    'ai.intro': '从日常观察出发，用AI探索新的创作方式。',
    'ai.listLabel': 'AI产品列表',
    'books.title': '书籍',
    'books.intro': '书稿、出版信息与延伸阅读。',
    'books.progress': '书稿整理中',
    'books.progressDescription': '暂无公开书目。你可以先了解AI产品。',
    'books.back': '返回首页',
    'yunjian.name': '云笺',
    'yunjian.otherName': 'Yunjian',
    'yunjian.art': '云来有信',
    'yunjian.category': '照片 · AI创作',
    'yunjian.description': '以云的照片和你心中所想为灵感，用AI写一封云笺。',
    'yunjian.enter': '查看云笺',
    'yunjian.availability': '照片上传与云笺生成暂不可用。',
  },
  en: {
    'meta.home': '光之十一 | Independent Products & Writing',
    'meta.ai': 'AI Products | 光之十一',
    'meta.books': 'Books | 光之十一',
    'meta.homeDescription': 'Explore AI products, books, and writing by independent creator 光之十一.',
    'meta.aiDescription': 'Explore AI products by 光之十一, including Yunjian, a writing tool inspired by cloud photos.',
    'meta.booksDescription': 'Books, publication details, and further reading by 光之十一.',
    'brand.homeLabel': 'Return to the 光之十一 home page',
    'nav.ai': 'AI Products',
    'nav.books': 'Books',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'language.label': '切换到中文',
    'language.short': '中文',
    'footer.tagline': 'Independent products & writing',
    'hero.products': 'Products',
    'hero.writing': '& Writing',
    'hero.label': 'Portfolio',
    'hero.lead': 'Explore AI products, books, and writing.',
    'hero.action': 'Explore AI products',
    'work.title': 'Explore the Work',
    'books.cardCategory': 'Books',
    'books.cardTitle': 'Books & Reading',
    'books.cardDescription': 'Books, publication details, and further reading.',
    'books.enter': 'Explore books',
    'about.title': '光之十一',
    'about.p1': 'I’m 光之十一, an independent creator. I build AI products and write books, with an interest in the meeting of technology and the humanities.',
    'ai.title': 'AI Products',
    'ai.intro': 'New ways to create with AI, inspired by everyday observations.',
    'ai.listLabel': 'AI products',
    'books.title': 'Books',
    'books.intro': 'Books, publication details, and further reading.',
    'books.progress': 'Books in Progress',
    'books.progressDescription': 'No titles are listed yet. You can explore the AI products in the meantime.',
    'books.back': 'Back home',
    'yunjian.name': 'Yunjian',
    'yunjian.otherName': '云笺',
    'yunjian.art': 'A Letter in the Clouds',
    'yunjian.category': 'Photography · AI Writing',
    'yunjian.description': 'An AI-written letter inspired by your cloud photo and what’s on your mind.',
    'yunjian.enter': 'Explore Yunjian',
    'yunjian.availability': 'Photo uploads and letter generation are temporarily unavailable.',
  },
}

let currentLocale = localStorage.getItem('shixilin-locale') === 'en' ? 'en' : 'zh'

export function getLocale() {
  return currentLocale
}

export function t(key) {
  return messages[currentLocale][key] || messages.zh[key] || key
}

export function toggleLocale() {
  currentLocale = currentLocale === 'zh' ? 'en' : 'zh'
  localStorage.setItem('shixilin-locale', currentLocale)
  return currentLocale
}
