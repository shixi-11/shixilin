import { aboutView } from './about.js'
import { servicesView } from './services.js'
import './styles.css'
import './home.css'
import './about.css'
import './services.css'
import './games.css'
import './support.css'
import './locales.css'
import { supportView, bindSupport } from './support.js'
import { gamesView, inkDuelView, baishishuView } from './games.js'
import { homeView, paperFooter } from './home.js'
import { getLocale, t, setLocale, syncLocale, locales, localizedHref } from './i18n.js'
import { composeLocaleHeadings } from './locales/typography.js'
import { books, dailyUrl } from './content.js'

const routes = {
  '/': { titleKey: 'meta.home', descriptionKey: 'meta.homeDescription', view: homeView },
  '/ai': { titleKey: 'meta.ai', descriptionKey: 'meta.aiDescription', view: aiView },
  '/games': { titleKey: 'meta.games', descriptionKey: 'meta.gamesDescription', view: gamesView },
  '/books': { titleKey: 'meta.books', descriptionKey: 'meta.booksDescription', view: booksView },
  '/about': { titleKey: 'meta.about', descriptionKey: 'meta.aboutDescription', view: aboutView },
  '/services': { titleKey: 'meta.services', descriptionKey: 'meta.servicesDescription', view: servicesView },
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
  const locale = locales.find(item => item.id === getLocale())
  document.documentElement.lang = locale.lang
  document.documentElement.dir = locale.dir || 'ltr'

  app.innerHTML = shell(route.view(), pathname)
  composeLocaleHeadings(app, locale.id)
  if (locale.dir === 'rtl') isolateMixedText()
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
            ${navLink('/services', t('services.nav'), activePath)}
            ${navLink('/support', t('support.nav'), activePath)}
          </nav>
          <div class="language-picker" dir="ltr">
            <svg class="language-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2 5h12M7 2v3M4 8c2 4 5 6 8 7M12 5c-1 5-4 8-8 10M13 22l5-11 5 11M15 18h6"/></svg>
            <select class="language-select" lang="${locales.find(locale => locale.id === getLocale()).lang}" aria-label="${t('language.label')}" dir="ltr">${locales.map(locale => `<option value="${locale.id}" lang="${locale.lang}"${getLocale() === locale.id ? ' selected' : ''}>${locale.name}</option>`).join('')}</select>
          </div>
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

  document.querySelector('.language-select')?.addEventListener('change', event => {
    const top = window.scrollY
    setLocale(event.target.value)
    window.history.pushState({}, '', localizedHref(location.href))
    render()
    document.querySelector('.language-select')?.focus({ preventScroll: true })
    window.scrollTo({ top })
  })

  document.querySelectorAll('a.internal-link').forEach((link) => {
    link.href = localizedHref(link.href)
    link.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      render()
    })
  })
}

// Isolate Latin names, Chinese titles and handles without reversing their characters in RTL text.
function isolateMixedText() {
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  for (const node of nodes) {
    if (node.parentElement.closest('select, svg, code, bdi, [dir="ltr"]')) continue
    const pattern = /(?:@?[A-Za-z0-9][A-Za-z0-9@._:/–-]*(?: [A-Za-z0-9][A-Za-z0-9._-]*)*|《[^》]+》|@?[\u3400-\u9fff]+)/g
    if (!pattern.test(node.data)) continue
    pattern.lastIndex = 0
    const fragment = document.createDocumentFragment()
    let end = 0
    for (const match of node.data.matchAll(pattern)) {
      fragment.append(node.data.slice(end, match.index))
      const isolated = document.createElement('bdi')
      isolated.dir = 'ltr'
      isolated.textContent = match[0]
      fragment.append(isolated)
      end = match.index + match[0].length
    }
    fragment.append(node.data.slice(end))
    node.replaceWith(fragment)
  }
}

window.addEventListener('popstate', () => { syncLocale(); render() })
render()
