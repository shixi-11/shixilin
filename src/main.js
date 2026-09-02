import './styles.css'
import './home.css'
import { homeView, paperFooter } from './home.js'
import { getLocale, t, toggleLocale } from './i18n.js'
import { books } from './content.js'

const routes = {
  '/': { titleKey: 'meta.home', descriptionKey: 'meta.homeDescription', view: homeView },
  '/works': { titleKey: 'meta.works', descriptionKey: 'meta.worksDescription', view: worksView },
  '/ai': { titleKey: 'meta.works', descriptionKey: 'meta.worksDescription', canonicalPath: '/works', view: worksView },
  '/books': { titleKey: 'meta.books', descriptionKey: 'meta.booksDescription', view: booksView },
  '/about': { titleKey: 'meta.about', descriptionKey: 'meta.aboutDescription', view: aboutView },
  '/notes': { titleKey: 'meta.notes', descriptionKey: 'meta.notesDescription', view: notesView },
}

const projects = [
  {
    slug: 'baishishu', category: 'home.games', title: 'game.name', text: 'game.short',
    href: 'https://x.com/baishishugame', action: 'game.open',
  },
  {
    slug: 'alux',
    index: '01',
    category: 'work.alux.category',
    title: 'work.alux.title',
    text: 'work.alux.text',
    href: 'https://alux.network/',
    action: 'work.open',
    featured: true,
  },
  {
    slug: 'mohe',
    index: '02',
    category: 'work.mohe.category',
    title: 'work.mohe.title',
    text: 'work.mohe.text',
    href: 'https://github.com/shixi-11/mohe-pet',
    action: 'work.github',
    image: '/assets/mohe-idle-v2-cutout.png',
    imageAlt: 'work.mohe.alt',
  },
  {
    slug: 'daily',
    index: '03',
    category: 'work.daily.category',
    title: 'work.daily.title',
    text: 'work.daily.text',
    href: 'https://github.com/shixi-11/alux-ai-agent-daily',
    action: 'work.github',
  },
  {
    slug: 'yunjian',
    index: '04',
    category: 'work.yunjian.category',
    title: 'work.yunjian.title',
    text: 'work.yunjian.text',
    href: '/ai/yunjian',
    action: 'work.open',
  },
]

const app = document.querySelector('#app')

function normalizePath(pathname) {
  if (pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

function render() {
  const pathname = normalizePath(window.location.pathname)
  const route = routes[pathname] || routes['/']
  const canonicalPath = route.canonicalPath || (routes[pathname] ? pathname : '/')
  const canonicalUrl = new URL(canonicalPath, 'https://shixilin.com').href

  document.title = t(route.titleKey)
  document.querySelector('meta[name="description"]').content = t(route.descriptionKey)
  document.querySelector('meta[property="og:title"]').content = t(route.titleKey)
  document.querySelector('meta[property="og:description"]').content = t(route.descriptionKey)
  document.querySelector('meta[property="og:site_name"]').content = t('brand.name')
  document.querySelector('meta[name="application-name"]').content = t('brand.name')
  document.querySelector('meta[name="apple-mobile-web-app-title"]').content = t('brand.name')
  document.querySelector('link[rel="canonical"]').href = canonicalUrl
  document.querySelector('meta[property="og:url"]').content = canonicalUrl
  document.documentElement.lang = getLocale() === 'en' ? 'en' : 'zh-CN'

  app.innerHTML = shell(route.view(), pathname)
  bindNavigation()

  if (window.location.hash) {
    const anchorId = decodeURIComponent(window.location.hash.slice(1))
    requestAnimationFrame(() => document.getElementById(anchorId)?.scrollIntoView())
  } else {
    window.scrollTo({ top: 0 })
  }
}

function shell(content, pathname) {
  const activePath = pathname === '/ai' ? '/works' : pathname
  return `
    <div class="site-shell${pathname === '/' ? ' home-shell' : ''}">
      <header class="site-header">
        <a class="brand internal-link" href="/" aria-label="${t('brand.homeLabel')}">
          <span class="brand-glyph" aria-hidden="true">十一</span>
          <span class="brand-lockup"><b>${t('brand.name')}</b><small>${t('brand.roman')}</small></span>
        </a>
        <div class="header-tools">
          <nav class="site-nav" id="site-nav" aria-label="${t('nav.menu')}">
            ${navLink('/#products', t('home.products'), activePath)}
            ${navLink('/books', t('home.books'), activePath)}
            ${navLink('/about', t('nav.about'), activePath)}
            ${navLink('/notes', t('home.notes'), activePath)}
          </nav>
          <button class="language-toggle" type="button" aria-label="${t('language.label')}">${t('language.short')}</button>
          <button class="menu-toggle" type="button" aria-label="${t('nav.menu')}" aria-expanded="false" aria-controls="site-nav">
            <span>${t('nav.menu')}</span><i aria-hidden="true"></i>
          </button>
        </div>
      </header>
      <main>${content}</main>
      ${paperFooter()}
    </div>
  `
}

function navLink(href, label, pathname) {
  const active = pathname === href || (href === '/#products' && ['/', '/works'].includes(pathname))
  return `<a class="internal-link${active ? ' active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a>`
}

function worksView() {
  return `<section class="quiet-page"><h1>${t('worksPage.title')}</h1><p>${t('worksPage.intro')}</p>
    <div class="reading-list">${projects.map(project => `<article class="reading-item">
      <small>${t(project.category)}</small><h2>${t(project.title)}</h2><p>${t(project.text)}</p>
      <a class="text-link" href="${project.href}"${project.href.startsWith('https:') ? ' target="_blank" rel="noopener"' : ''}>${t(project.action)} <span aria-hidden="true">${project.href.startsWith('https:') ? '↗' : '→'}</span></a>
    </article>`).join('')}</div>
    <a class="text-link internal-link" href="/">${t('books.back')} <span aria-hidden="true">←</span></a>
  </section>`
}

function booksView() {
  return `<section class="quiet-page"><h1>${t('home.books')}</h1><p>${t('booksPage.intro')}</p>
    <div class="reading-list">${books.map(book => `<article class="reading-item"><small>${t(book.category)}</small><h2>${t(book.title).split(' · ').map((part, index) => `<span class="${index ? 'book-translation' : 'book-original'}">${part}</span>`).join('')}</h2><p>${t(book.text)}</p>${book.href ? `<a class="text-link" href="${book.href}" target="_blank" rel="noopener">${t('books.read')} <span aria-hidden="true">↗</span></a>` : ''}</article>`).join('')}</div>
    <p class="book-status">${t('books.status')}</p>
    <a class="text-link internal-link" href="/">${t('books.back')} <span aria-hidden="true">←</span></a>
  </section>`
}

function aboutView() {
  return `<section class="quiet-page">
    <h1>${t('nav.about')}</h1>
    <p>${t('home.aboutIntro')}</p>
    <p>${t('home.aboutWriting')}</p>
    <dl class="about-details">${['travel', 'practice', 'tradition', 'creation', 'business'].map(key => `<div><dt>${t(`about.${key}.term`)}</dt><dd>${t(`about.${key}.text`)}</dd></div>`).join('')}</dl>
    <a class="text-link internal-link" href="/works">${t('work.all')} <span aria-hidden="true">→</span></a>
    <div class="quiet-contact" id="contact"><h2>${t('nav.contact')}</h2><p>${t('footer.follow')}</p><p><a href="https://x.com/11Shixi" target="_blank" rel="noopener">X / Twitter · @11Shixi ↗</a></p><p><a href="https://www.instagram.com/shixi_11/" target="_blank" rel="noopener">Instagram · @shixi_11 ↗</a></p><p><a href="https://www.tiktok.com/@shixilin" target="_blank" rel="noopener">TikTok · @shixilin ↗</a></p>
      <a class="text-link" href="https://github.com/shixi-11" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </section>`
}

function notesView() {
  return `<section class="quiet-page"><h1>${t('home.notes')}</h1><span class="gold-rule" aria-hidden="true"></span><p class="notes-empty">${t('home.notesEmpty')}</p><a class="text-link internal-link" href="/books">${t('home.browseBooks')} <span aria-hidden="true">→</span></a></section>`
}

function bindNavigation() {
  const menuButton = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.site-nav')

  menuButton?.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', String(!expanded))
    nav?.classList.toggle('open', !expanded)
  })

  document.querySelector('.language-toggle')?.addEventListener('click', () => {
    toggleLocale()
    render()
  })

  document.querySelectorAll('a.internal-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.hash}`)
      render()
    })
  })
}

window.addEventListener('popstate', render)
render()
