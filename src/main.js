import { aboutView } from './about.js'
import './styles.css'
import './home.css'
import './about.css'
import './games.css'
import './support.css'
import { supportView, bindSupport } from './support.js'
import { gamesView, inkDuelView, baishishuView } from './games.js'
import { homeView, paperFooter } from './home.js'
import { getLocale, t, toggleLocale } from './i18n.js'
import { books, dailyUrl } from './content.js'

const routes = {
  '/': { titleKey: 'meta.home', descriptionKey: 'meta.homeDescription', view: homeView },
  '/ai': { titleKey: 'meta.ai', descriptionKey: 'meta.aiDescription', view: aiView },
  '/games': { titleKey: 'meta.games', descriptionKey: 'meta.gamesDescription', view: gamesView },
  '/books': { titleKey: 'meta.books', descriptionKey: 'meta.booksDescription', view: booksView },
  '/about': { titleKey: 'meta.about', descriptionKey: 'meta.aboutDescription', view: aboutView },
  '/support': { titleKey: 'meta.support', descriptionKey: 'meta.supportDescription', view: supportView },
  '/games/ink-duel': { titleKey: 'meta.inkDuel', descriptionKey: 'meta.inkDuelDescription', image: '/assets/ink-duel-concept.png', view: inkDuelView },
  '/games/baishishu': { titleKey: 'meta.baishishu', descriptionKey: 'meta.baishishuDescription', image: '/assets/baishishu-opening.jpg', view: baishishuView },
}

const projects = [
  { slug: 'daily', category: 'work.daily.category', title: 'work.daily.title', text: 'work.daily.text', href: dailyUrl(), action: 'home.readDaily' },
  { slug: 'mohe', category: 'work.mohe.category', title: 'work.mohe.title', text: 'work.mohe.text', href: 'https://github.com/shixi-11/mohe-pet', action: 'work.github' },
  { slug: 'yunjian', category: 'work.yunjian.category', title: 'work.yunjian.title', text: 'work.yunjian.text', href: '/ai/yunjian', action: 'work.open' },
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
  document.querySelector('meta[property="og:image"]').content = new URL(route.image || '/assets/og-shixilin.jpg', 'https://shixilin.com').href
  document.querySelector('meta[property="og:image:width"]').content = pathname === '/games/ink-duel' ? '1672' : '1200'
  document.querySelector('meta[property="og:image:height"]').content = pathname === '/games/ink-duel' ? '941' : pathname === '/games/baishishu' ? '675' : '630'
  document.documentElement.lang = getLocale() === 'en' ? 'en' : 'zh-CN'

  app.innerHTML = shell(route.view(), pathname)
  bindNavigation()
  bindSupport()

  if (window.location.hash) {
    const anchorId = decodeURIComponent(window.location.hash.slice(1))
    requestAnimationFrame(() => document.getElementById(anchorId)?.scrollIntoView())
  } else {
    window.scrollTo({ top: 0 })
  }
}

function shell(content, pathname) {
  const activePath = pathname
  return `
    <div class="site-shell${pathname === '/' ? ' home-shell' : ''}">
      <header class="site-header">
        <a class="brand internal-link" href="/" aria-label="${t('brand.homeLabel')}">
          <span class="brand-glyph" aria-hidden="true">十一</span>
          <span class="brand-lockup"><b>${t('brand.name')}</b><small>${t('brand.roman')}</small></span>
        </a>
        <div class="header-tools">
          <nav class="site-nav" id="site-nav" aria-label="${t('nav.menu')}">
            ${navLink('/ai', t('home.products'), activePath)}
            ${navLink('/games', t('games.nav'), activePath)}
            ${navLink('/books', t('home.books'), activePath)}
            ${navLink('/about', t('nav.about'), activePath)}
            ${navLink('/support', t('support.nav'), activePath)}
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
  const gameSection = href === '/games' && pathname.startsWith('/games/')
  const active = pathname === href || gameSection
  return `<a class="internal-link${active ? ' active' : ''}" href="${href}"${active ? ` aria-current="${gameSection ? 'location' : 'page'}"` : ''}>${label}</a>`
}

function aiView() {
  return `<section class="quiet-page"><h1>${t('aiPage.title')}</h1><p>${t('aiPage.intro')}</p>
    <ol class="reading-list ai-list">${projects.map((project, index) => {
      const href = project.href
      return `<li class="reading-item">
      <small class="ai-item-meta"><span class="ai-item-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${t(project.category)}</small><h2>${t(project.title).replace(/AI智能体|情报日报/g, phrase => `<span class="title-phrase">${phrase}</span>`)}</h2><p>${t(project.text)}</p>
      <a class="text-link" href="${href}"${href.startsWith('https:') ? ' target="_blank" rel="noopener"' : ''}>${t(project.action)} <span aria-hidden="true">${href.startsWith('https:') ? '↗' : '→'}</span></a>
    </li>`}).join('')}</ol>
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
