import './styles.css'
import { getLocale, t, toggleLocale } from './i18n.js'

const routes = {
  '/': { titleKey: 'meta.home', descriptionKey: 'meta.homeDescription', view: homeView },
  '/works': { titleKey: 'meta.works', descriptionKey: 'meta.worksDescription', view: worksView },
  '/ai': { titleKey: 'meta.works', descriptionKey: 'meta.worksDescription', canonicalPath: '/works', view: worksView },
  '/books': { titleKey: 'meta.books', descriptionKey: 'meta.booksDescription', view: booksView },
}

const projects = [
  {
    slug: 'alux',
    index: '01',
    category: 'work.alux.category',
    title: 'work.alux.title',
    text: 'work.alux.text',
    href: 'https://www.alux.network/',
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
    action: 'work.private',
  },
]

const books = [
  { index: '01', category: 'book.yinian.category', title: 'book.yinian.title', text: 'book.yinian.text' },
  { index: '02', category: 'book.daitian.category', title: 'book.daitian.title', text: 'book.daitian.text' },
  { index: '03', category: 'book.poetry.category', title: 'book.poetry.title', text: 'book.poetry.text' },
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
  bindReveals()

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
    <div class="site-shell">
      <header class="site-header">
        <a class="brand internal-link" href="/" aria-label="${t('brand.homeLabel')}">
          <span class="brand-glyph" aria-hidden="true">十一</span>
          <span class="brand-lockup"><b>${t('brand.name')}</b><small>${t('brand.roman')}</small></span>
        </a>
        <div class="header-tools">
          <nav class="site-nav" id="site-nav" aria-label="${t('nav.menu')}">
            ${navLink('/works', t('nav.work'), activePath)}
            ${navLink('/books', t('nav.writing'), activePath)}
            <a class="internal-link" href="/#about">${t('nav.about')}</a>
            <a class="internal-link" href="/#contact">${t('nav.contact')}</a>
          </nav>
          <button class="language-toggle" type="button" aria-label="${t('language.label')}">${t('language.short')}</button>
          <button class="menu-toggle" type="button" aria-label="${t('nav.menu')}" aria-expanded="false" aria-controls="site-nav">
            <span>${t('nav.menu')}</span><i aria-hidden="true"></i>
          </button>
        </div>
      </header>
      <main>${content}</main>
      <footer class="site-footer">
        <div class="footer-brand">
          <span class="brand-glyph" aria-hidden="true">十一</span>
          <b>${t('brand.name')}</b>
        </div>
        <div class="footer-copy">
          <p>${t('footer.tagline')}</p>
          <p>${t('footer.follow')}</p>
        </div>
        <p class="copyright">© ${new Date().getFullYear()} SHIXI LIN</p>
      </footer>
    </div>
  `
}

function navLink(href, label, pathname) {
  const active = pathname === href
  return `<a class="internal-link${active ? ' active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a>`
}

function homeView() {
  return `
    <section class="hero" id="top">
      <div class="hero-main reveal">
        <div class="hero-name-lockup">
          <span>${t('hero.roman')}</span>
          <h1>${t('hero.name')}</h1>
        </div>
        <p class="hero-title">${t('hero.title')}</p>
        <p class="hero-lead">${t('hero.lead')}</p>
        <div class="hero-actions">
          <a class="action action-solid internal-link" href="/#work">${t('hero.primary')}<span aria-hidden="true">↓</span></a>
          <a class="action action-line internal-link" href="/#about">${t('hero.secondary')}<span aria-hidden="true">→</span></a>
        </div>
      </div>

      <aside class="identity-index reveal reveal-late" aria-label="${t('hero.index')}">
        <div class="index-top">
          <span>${t('hero.index')}</span>
          <strong aria-hidden="true">11</strong>
        </div>
        <p>${t('hero.statement')}</p>
        <ul>
          <li><span>01</span>${t('hero.role1')}</li>
          <li><span>02</span>${t('hero.role2')}</li>
          <li><span>03</span>${t('hero.role3')}</li>
          <li><span>04</span>${t('hero.role4')}</li>
        </ul>
      </aside>

      <div class="hero-facts reveal reveal-late">
        ${fact('hero.fact1.value', 'hero.fact1.label')}
        ${fact('hero.fact2.value', 'hero.fact2.label')}
        ${fact('hero.fact3.value', 'hero.fact3.label')}
      </div>
    </section>

    ${pathSection()}
    ${workSection(true)}
    ${writingSection(true)}
    ${aboutSection()}
    ${contactSection()}
  `
}

function pathSection() {
  return `
    <section class="path-section" id="about">
      <div class="section-marker reveal"><span>01</span><p>${t('path.label')}</p></div>
      <div class="path-heading reveal">
        <h2>${t('path.title')}</h2>
      </div>
      <div class="path-copy reveal">
        <p>${t('path.p1')}</p>
        <p>${t('path.p2')}</p>
      </div>
      <blockquote class="path-quote reveal">${t('path.quote')}</blockquote>
    </section>
  `
}

function workSection(preview = false) {
  const list = preview ? projects : projects
  return `
    <section class="work-section" id="work">
      <div class="section-intro reveal">
        <div class="section-marker"><span>02</span><p>${t('work.label')}</p></div>
        <h2>${t('work.title')}</h2>
        <div class="section-summary">
          <p>${t('work.intro')}</p>
          ${preview ? `<a class="text-link internal-link" href="/works">${t('work.all')}<span aria-hidden="true">→</span></a>` : ''}
        </div>
      </div>
      <div class="project-ledger">
        ${list.map(projectItem).join('')}
      </div>
    </section>
  `
}

function projectItem(project) {
  const content = `
    <span class="project-index">${project.index}</span>
    <div class="project-copy">
      <p class="project-category">${t(project.category)}</p>
      <h3>${t(project.title)}</h3>
      <p class="project-description">${t(project.text)}</p>
      <span class="project-action">${t(project.action)}<b aria-hidden="true">${project.href ? '↗' : '·'}</b></span>
    </div>
    ${project.image ? `<div class="project-visual"><img src="${project.image}" alt="${t(project.imageAlt)}" width="700" height="700" loading="lazy" /></div>` : ''}
    ${project.featured ? '<div class="alux-field" aria-hidden="true"><i></i><i></i><i></i><b>A</b></div>' : ''}
  `

  if (!project.href) return `<article class="project-item ${project.slug} reveal">${content}</article>`
  return `<a class="project-item ${project.slug}${project.featured ? ' featured' : ''} reveal" href="${project.href}" target="_blank" rel="noopener">${content}</a>`
}

function writingSection(preview = false) {
  return `
    <section class="writing-section" id="writing">
      <div class="writing-intro reveal">
        <div class="section-marker"><span>03</span><p>${t('writing.label')}</p></div>
        <h2>${t('writing.title')}</h2>
        <p>${t('writing.intro')}</p>
        ${preview ? `<a class="text-link internal-link" href="/books">${t('writing.all')}<span aria-hidden="true">→</span></a>` : `<span class="status-line">${t('books.status')}</span>`}
      </div>
      <div class="book-ledger">
        ${books.map(bookItem).join('')}
      </div>
    </section>
  `
}

function bookItem(book) {
  return `
    <article class="book-item reveal">
      <span class="book-index">${book.index}</span>
      <div class="book-title"><p>${t(book.category)}</p><h3>${t(book.title)}</h3></div>
      <p class="book-description">${t(book.text)}</p>
    </article>
  `
}

function aboutSection() {
  const items = [
    ['about.travel.term', 'about.travel.text'],
    ['about.practice.term', 'about.practice.text'],
    ['about.tradition.term', 'about.tradition.text'],
    ['about.creation.term', 'about.creation.text'],
    ['about.business.term', 'about.business.text'],
  ]
  return `
    <section class="about-section">
      <div class="about-heading reveal">
        <div class="section-marker"><span>04</span><p>${t('about.label')}</p></div>
        <h2>${t('about.title')}</h2>
        <p>${t('about.intro')}</p>
      </div>
      <dl class="evidence-list">
        ${items.map(([term, text], index) => `<div class="reveal"><span>0${index + 1}</span><dt>${t(term)}</dt><dd>${t(text)}</dd></div>`).join('')}
      </dl>
    </section>
  `
}

function contactSection() {
  return `
    <section class="contact-section" id="contact">
      <div class="section-marker reveal"><span>05</span><p>${t('contact.label')}</p></div>
      <h2 class="reveal">${t('contact.title')}</h2>
      <div class="contact-bottom reveal">
        <p>${t('contact.text')}</p>
        <div class="contact-actions">
          <a class="action action-light" href="https://github.com/shixi-11" target="_blank" rel="noopener">${t('contact.github')}<span aria-hidden="true">↗</span></a>
          <a class="action action-ghost" href="https://www.alux.network/" target="_blank" rel="noopener">${t('contact.alux')}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  `
}

function worksView() {
  return `
    ${pageHero('02', 'work.label', 'worksPage.title', 'worksPage.intro')}
    ${workSection(false)}
    ${contactSection()}
  `
}

function booksView() {
  return `
    ${pageHero('03', 'writing.label', 'booksPage.title', 'booksPage.intro')}
    ${writingSection(false)}
    <a class="back-home internal-link" href="/">← ${t('books.back')}</a>
  `
}

function pageHero(index, labelKey, titleKey, introKey) {
  return `
    <section class="page-hero">
      <div class="section-marker reveal"><span>${index}</span><p>${t(labelKey)}</p></div>
      <h1 class="reveal">${t(titleKey)}</h1>
      <p class="reveal reveal-late">${t(introKey)}</p>
    </section>
  `
}

function fact(valueKey, labelKey) {
  return `<div><strong>${t(valueKey)}</strong><span>${t(labelKey)}</span></div>`
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

function bindReveals() {
  const elements = [...document.querySelectorAll('.reveal')]
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.12 })

  elements.forEach((element) => observer.observe(element))
}

window.addEventListener('popstate', render)
render()
