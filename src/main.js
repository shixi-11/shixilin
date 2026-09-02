import { socialProfiles } from './social.js'
import './styles.css'
import './home.css'
import './about.css'
import { homeView, paperFooter } from './home.js'
import { getLocale, t, toggleLocale } from './i18n.js'
import { books } from './content.js'

const routes = {
  '/': { titleKey: 'meta.home', descriptionKey: 'meta.homeDescription', view: homeView },
  '/ai': { titleKey: 'meta.ai', descriptionKey: 'meta.aiDescription', view: aiView },
  '/books': { titleKey: 'meta.books', descriptionKey: 'meta.booksDescription', view: booksView },
  '/about': { titleKey: 'meta.about', descriptionKey: 'meta.aboutDescription', view: aboutView },
  '/notes': { titleKey: 'meta.notes', descriptionKey: 'meta.notesDescription', view: notesView },
}

const projects = [
  { slug: 'daily', category: 'work.daily.category', title: 'work.daily.title', text: 'work.daily.text', href: 'https://github.com/shixi-11/alux-ai-agent-daily', action: 'work.github' },
  { slug: 'mohe', category: 'work.mohe.category', title: 'work.mohe.title', text: 'work.mohe.text', href: 'https://github.com/shixi-11/mohe-pet', action: 'work.github' },
  { slug: 'baishishu', category: 'home.games', title: 'game.name', text: 'game.short', href: 'https://x.com/baishishugame', action: 'game.open' },
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
  const active = pathname === href
  return `<a class="internal-link${active ? ' active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a>`
}

function aiView() {
  return `<section class="quiet-page"><h1>${t('aiPage.title')}</h1><p>${t('aiPage.intro')}</p>
    <ol class="reading-list ai-list">${projects.map((project, index) => `<li class="reading-item">
      <small class="ai-item-meta"><span class="ai-item-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${t(project.category)}</small><h2>${t(project.title).replace(/AI智能体|情报日报/g, phrase => `<span class="title-phrase">${phrase}</span>`)}</h2><p>${t(project.text)}</p>
      <a class="text-link" href="${project.href}"${project.href.startsWith('https:') ? ' target="_blank" rel="noopener"' : ''}>${t(project.action)} <span aria-hidden="true">${project.href.startsWith('https:') ? '↗' : '→'}</span></a>
    </li>`).join('')}</ol>
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
  const aboutText = key => t(key).replace(/《([^》]+)》/g, '<span class="book-title">《$1》</span>')
  return `<section class="about-page">
    <header class="about-masthead">
      <div class="about-identity">
        <p class="about-eyebrow">${t('nav.about')}</p>
        <h1>${t('home.name')}</h1>
        <p class="about-alias">${t('about.alias')}</p>
        <p class="about-roles"><span>${t('about.roles1')}</span><span>${t('about.roles2')}</span></p>
      </div>
      <div class="about-introduction">
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="about-lead">${t('about.lead')}</p>
        <p>${t('home.aboutWriting')}</p>
      </div>
    </header>
    <section class="about-chapter" aria-labelledby="about-creation-title">
      <h2 id="about-creation-title">${t('about.creationsTitle')}</h2>
      <div class="about-creations">
        <article><h3>${t('about.creation.term')}</h3><p>${aboutText('about.creation.text')}</p><a class="about-link internal-link" href="/books">${t('home.browseBooks')} <span aria-hidden="true">→</span></a></article>
        <article><h3>${t('about.buildTitle')}</h3><p>${t('about.business.text')}</p><p>${aboutText('about.buildText')}</p><a class="about-link internal-link" href="/ai">${t('work.all')} <span aria-hidden="true">→</span></a></article>
      </div>
      <a class="about-company" href="https://elevencapital.ltd/" target="_blank" rel="noopener">
        <span><small>${t('about.companyLabel')}</small><strong>${t('about.companyName')}</strong></span>
        <span class="about-company-alias">${t('about.companyAlias')}</span><span class="about-company-arrow" aria-hidden="true">↗</span>
      </a>
    </section>
    <section class="about-chapter" aria-labelledby="about-experience-title">
      <h2 id="about-experience-title">${t('about.experienceTitle')}</h2>
      <dl class="about-experience">
        <div><dt>${t('about.travel.term')}</dt><dd>${t('about.travel.text')}</dd></div>
        <div><dt>${t('about.practice.term')}</dt><dd><ul class="about-credentials">${[1, 2, 3].map(index => `<li>${t(`about.credential${index}`)}</li>`).join('')}</ul></dd></div>
        <div><dt>${t('about.tradition.term')}</dt><dd>${t('about.tradition.text')}</dd></div>
      </dl>
    </section>
    <section class="about-chapter about-contact" id="contact" aria-labelledby="about-contact-title">
      <h2 id="about-contact-title">${t('about.contactTitle')}</h2>
      <a class="about-mail-card" href="mailto:info@elevencapital.ltd">
        <span><small>${t('about.mailLabel')}</small><span class="about-mail-address">info@elevencapital.ltd</span></span>
        <span class="about-mail-action">${t('about.writeEmail')} <span aria-hidden="true">↗</span></span>
      </a>
      <div class="about-social-directory">${socialProfiles.map(profile => `<a href="${profile.href}" target="_blank" rel="noopener"><span class="about-social-icon">${profile.icon}</span><span class="about-social-copy"><span class="about-platform">${profile.name}</span><span class="about-handle">${profile.handle}</span></span><span class="about-external" aria-hidden="true">↗</span></a>`).join('')}</div>
      <div class="about-public-profile"><strong>@${t('brand.name')}</strong><p>${t('about.channels')}</p></div>
    </section>
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
