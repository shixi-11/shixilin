const messages = {
  zh: {
    'meta.home': '光之十一｜独立作品与长期实验',
    'meta.ai': 'AI产品｜光之十一',
    'meta.books': '书籍｜光之十一',
    'brand.homeLabel': '返回光之十一首页',
    'nav.ai': 'AI产品',
    'nav.books': '书籍',
    'nav.about': '关于',
    'nav.menu': '目录',
    'language.label': 'Switch to English',
    'language.short': 'EN',
    'footer.tagline': '独立作品与长期实验',
    'hero.title': '独立作品<br />与长期实验',
    'hero.lead': '在技术与人文之间，寻找安静的接口。<br />做独立的产品，写诚实的文字。',
    'hero.action': '查看AI产品',
    'hero.note': '让每件作品，<br />找到它自己的名字。',
    'work.title': '正在发生的作品',
    'work.description': '先做成可以使用的东西，再让名字慢慢长大。',
    'books.cardCategory': '书籍',
    'books.cardTitle': '写完以后，<br />在这里相见',
    'books.cardDescription': '书稿、出版信息与延伸阅读。',
    'books.enter': '进入书籍',
    'about.title': '光之十一',
    'about.p1': '我把这里当作一座持续生长的作品馆：收纳独立产品、AI实验和书籍，也记录它们从想法走向真实使用的过程。',
    'about.p2': '成熟的作品会拥有自己的品牌与域名；在那以前，它们先在这里被看见、被使用。',
    'ai.title': 'AI产品',
    'ai.intro': '不是模型能力的陈列，而是我愿意长期打磨、真正交给人使用的作品。',
    'ai.next': '接下来',
    'ai.nextDescription': '新的作品会继续出现在这里，但不会为了填满页面而提前占位。',
    'books.title': '书籍',
    'books.intro': '书会在写完以后，自己来到这里。',
    'books.progress': '正在整理',
    'books.progressDescription': '这里将收纳作品、出版信息与延伸阅读。现在先留一张安静的书桌。',
    'books.back': '返回首页',
    'yunjian.art': '云来有信',
    'yunjian.category': 'AI产品 · 公开内测',
    'yunjian.description': '拍下一片云，问一件事。让天空写回一封只属于此刻的信。',
    'yunjian.enter': '进入云笺',
  },
  en: {
    'meta.home': '光之十一 | Independent Work & Long-Term Experiments',
    'meta.ai': 'AI Products | 光之十一',
    'meta.books': 'Books | 光之十一',
    'brand.homeLabel': 'Return to the 光之十一 home page',
    'nav.ai': 'AI Products',
    'nav.books': 'Books',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'language.label': '切换到中文',
    'language.short': '中文',
    'footer.tagline': 'Independent work & long-term experiments',
    'hero.title': 'Independent Work<br />& Long-Term Experiments',
    'hero.lead': 'Finding quieter interfaces between technology and the human world.<br />Building independent products and writing with honesty.',
    'hero.action': 'Explore AI products',
    'hero.note': 'Let every work<br />grow into its own name.',
    'work.title': 'Works in Progress',
    'work.description': 'First make something people can use. Let the name grow into itself later.',
    'books.cardCategory': 'Books',
    'books.cardTitle': 'When the writing is done,<br />we will meet here',
    'books.cardDescription': 'Books in progress, publication notes, and further reading.',
    'books.enter': 'Explore books',
    'about.title': '光之十一',
    'about.p1': 'I think of this as a gallery that keeps growing: a home for independent products, AI experiments, and books, as well as a record of how they move from an idea into real use.',
    'about.p2': 'Mature works will eventually have identities and domains of their own. Until then, this is where they can first be seen and used.',
    'ai.title': 'AI Products',
    'ai.intro': 'Not a showcase of model capabilities, but works I am willing to refine over time and place in people’s hands.',
    'ai.next': 'Next',
    'ai.nextDescription': 'New works will appear here as they become real. Nothing will be added merely to fill the page.',
    'books.title': 'Books',
    'books.intro': 'The books will find their way here when the writing is done.',
    'books.progress': 'Taking Shape',
    'books.progressDescription': 'This space will hold books, publication details, and further reading. For now, it keeps an empty desk ready.',
    'books.back': 'Back home',
    'yunjian.art': 'A Letter in the Clouds',
    'yunjian.category': 'AI Product · Public Beta',
    'yunjian.description': 'Photograph a cloud and ask one question. Let the sky write a letter for this moment alone.',
    'yunjian.enter': 'Enter Yunjian',
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
