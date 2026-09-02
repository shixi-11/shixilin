import './styles.css'
import { getLocale, t, toggleLocale } from './i18n.js'

const routes = {
  '/': {
    titleKey: 'meta.home',
    descriptionKey: 'meta.homeDescription',
    view: homeView,
  },
  '/works': {
    titleKey: 'meta.works',
    descriptionKey: 'meta.worksDescription',
    view: worksView,
  },
  '/ai': {
    titleKey: 'meta.ai',
    descriptionKey: 'meta.aiDescription',
    canonicalPath: '/works',
    view: worksView,
  },
  '/books': {
    titleKey: 'meta.books',
    descriptionKey: 'meta.booksDescription',
    view: booksView,
  },
}

const app = document.querySelector('#app')

function normalizePath(pathname) {
  if (pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

function render() {
  const pathname = normalizePath(window.location.pathname)
  const route = routes[pathname] || routes['/']
  document.title = t(route.titleKey)
  document.querySelector('meta[name="description"]').content = t(route.descriptionKey)
  document.querySelector('meta[property="og:title"]').content = t(route.titleKey)
  document.querySelector('meta[property="og:description"]').content = t(route.descriptionKey)
  document.querySelector('meta[property="og:site_name"]').content = t('brand.name')
  document.querySelector('meta[name="application-name"]').content = t('brand.name')
  document.querySelector('meta[name="apple-mobile-web-app-title"]').content = t('brand.name')
  const canonicalPath = route.canonicalPath || (routes[pathname] ? pathname : '/')
  const canonicalUrl = new URL(canonicalPath, 'https://shixilin.com').href
  document.querySelector('link[rel="canonical"]').href = canonicalUrl
  document.querySelector('meta[property="og:url"]').content = canonicalUrl
  document.documentElement.lang = getLocale() === 'en' ? 'en' : 'zh-CN'
  app.innerHTML = shell(route.view(), pathname)
  bindNavigation()
  window.scrollTo({ top: 0 })
  if (window.location.hash) {
    const anchorId = decodeURIComponent(window.location.hash.slice(1))
    requestAnimationFrame(() => document.getElementById(anchorId)?.scrollIntoView())
  }
}

function shell(content, pathname) {
  return `
    <div class="site-shell">
      <header class="site-header">
        <a class="signature internal-link" href="/" aria-label="${t('brand.homeLabel')}">
          <img class="signature-mark" src="/favicon.svg" width="32" height="32" alt="" />
          <span>${t('brand.name')}</span>
        </a>
        <div class="header-actions">
          <nav class="site-nav" id="site-nav" aria-label="${t('nav.menu')}">
            ${navLink('/works', t('nav.works'), pathname === '/ai' ? '/works' : pathname)}
            ${navLink('/books', t('nav.books'), pathname)}
            <a href="/#about" class="internal-link">${t('nav.about')}</a>
            <a href="/#contact" class="internal-link">${t('nav.contact')}</a>
          </nav>
          <button class="language-toggle" type="button" aria-label="${t('language.label')}">${t('language.short')}</button>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span>${t('nav.menu')}</span><i></i>
          </button>
        </div>
      </header>
      <main>${content}</main>
      <footer class="site-footer">
        <a class="signature internal-link" href="/"><span>${t('brand.name')}</span></a>
        <div class="footer-center">
          <p>${t('footer.tagline')}</p>
          <p>${t('footer.follow')}</p>
        </div>
        <p class="copyright">© ${new Date().getFullYear()} ${t('brand.name')}</p>
      </footer>
    </div>
  `
}

function navLink(href, label, pathname) {
  const active = pathname === href
  return `<a href="${href}" class="internal-link${active ? ' active' : ''}"${active ? ' aria-current="page"' : ''}>${label}</a>`
}

function homeView() {
  return `
    <section class="hero">
      <div class="hero-copy reveal">
        <p class="eyebrow">${t('hero.label')}</p>
        <h1>
          <span class="hero-name">${t('hero.name')}</span>
          <span class="hero-thesis">${t('hero.title')}</span>
        </h1>
      </div>
      <figure class="identity-visual reveal-delay">
        <a href="/assets/光之十一-作者简介.jpg" target="_blank" rel="noopener" aria-label="${t('hero.imageHint')}">
          <img src="/assets/光之十一-作者简介.jpg" alt="${t('hero.imageAlt')}" width="1194" height="1600" fetchpriority="high" />
        </a>
        <figcaption><span>${t('hero.imageLabel')}</span><small>${t('hero.imageHint')}</small></figcaption>
      </figure>
      <div class="hero-details reveal">
        <p class="hero-lead">${t('hero.lead')}</p>
        <div class="hero-actions">
          <a class="primary-link internal-link" href="/#work">${t('hero.primary')} <span aria-hidden="true">↘</span></a>
          <a class="line-link internal-link" href="/#about">${t('hero.secondary')} <span aria-hidden="true">→</span></a>
        </div>
        <ul class="proof-strip" aria-label="${t('hero.highlightsLabel')}">
          <li>${t('hero.proof1')}</li>
          <li>${t('hero.proof2')}</li>
          <li>${t('hero.proof3')}</li>
        </ul>
      </div>
    </section>

    <section class="manifesto" id="about">
      <div class="manifesto-heading">
        <p class="eyebrow">${t('manifesto.label')}</p>
        <h2>${t('manifesto.title')}</h2>
      </div>
      <div class="manifesto-copy">
        <p>${t('manifesto.p1')}</p>
        <p>${t('manifesto.p2')}</p>
        <p>${t('manifesto.p3')}</p>
        <blockquote>${t('manifesto.quote')}</blockquote>
      </div>
    </section>

    <section class="axes" aria-labelledby="axes-title">
      <div class="section-heading split-heading">
        <p class="eyebrow">${t('axis.label')}</p>
        <h2 id="axes-title">${t('axis.title')}</h2>
      </div>
      <div class="axis-grid">
        ${axisItem('01', 'axis.digital.title', 'axis.digital.text')}
        ${axisItem('02', 'axis.writing.title', 'axis.writing.text')}
        ${axisItem('03', 'axis.practice.title', 'axis.practice.text')}
        ${axisItem('04', 'axis.world.title', 'axis.world.text')}
      </div>
    </section>

    <section class="work-section" id="work" aria-labelledby="work-title">
      <div class="section-heading works-heading">
        <div>
          <p class="eyebrow">${t('works.label')}</p>
          <h2 id="work-title">${t('works.title')}</h2>
        </div>
        <div>
          <p>${t('works.intro')}</p>
          <a class="line-link internal-link" href="/works">${t('works.all')} <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="work-grid">
        ${workCard('alux featured', 'works.alux.category', 'works.alux.title', 'works.alux.text', 'https://www.alux.network/', 'works.visit', 'A')}
        ${workCard('daily', 'works.daily.category', 'works.daily.title', 'works.daily.text', 'https://github.com/shixi-11/alux-ai-agent-daily', 'works.github', '11')}
        ${workCard('mohe', 'works.mohe.category', 'works.mohe.title', 'works.mohe.text', 'https://github.com/shixi-11/mohe-pet', 'works.github', '墨', false, '/assets/mohe-idle-v2-cutout.png', 'works.mohe.imageAlt')}
        ${workCard('yunjian', 'works.yunjian.category', 'works.yunjian.title', 'works.yunjian.text', '/ai/yunjian', 'works.visit', '云')}
        ${workCard('writing', 'works.books.category', 'works.books.title', 'works.books.text', '/books', 'works.read', '文', true)}
      </div>
    </section>

    <section class="profile" aria-labelledby="profile-title">
      <div class="profile-intro">
        <p class="eyebrow">${t('profile.label')}</p>
        <h2 id="profile-title">${t('profile.title')}</h2>
        <p>${t('profile.intro')}</p>
      </div>
      <dl class="profile-list">
        ${profileItem('profile.travel.term', 'profile.travel.text')}
        ${profileItem('profile.practice.term', 'profile.practice.text')}
        ${profileItem('profile.spirit.term', 'profile.spirit.text')}
        ${profileItem('profile.creation.term', 'profile.creation.text')}
        ${profileItem('profile.business.term', 'profile.business.text')}
      </dl>
    </section>

    <section class="contact" id="contact">
      <p class="eyebrow">${t('contact.label')}</p>
      <h2>${t('contact.title')}</h2>
      <p>${t('contact.text')}</p>
      <div class="contact-actions">
        <a class="primary-link inverse" href="https://github.com/shixi-11" target="_blank" rel="noopener">${t('contact.github')} <span aria-hidden="true">↗</span></a>
        <a class="line-link inverse-line" href="https://www.alux.network/" target="_blank" rel="noopener">${t('contact.alux')} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `
}

function worksView() {
  return `
    <section class="page-intro reveal">
      <p class="eyebrow">${t('works.label')}</p>
      <h1>${t('worksPage.title')}</h1>
      <p>${t('worksPage.intro')}</p>
    </section>
    <section class="work-section page-work" aria-label="${t('worksPage.title')}">
      <div class="work-grid">
        ${workCard('alux featured', 'works.alux.category', 'works.alux.title', 'works.alux.text', 'https://www.alux.network/', 'works.visit', 'A')}
        ${workCard('daily', 'works.daily.category', 'works.daily.title', 'works.daily.text', 'https://github.com/shixi-11/alux-ai-agent-daily', 'works.github', '11')}
        ${workCard('mohe', 'works.mohe.category', 'works.mohe.title', 'works.mohe.text', 'https://github.com/shixi-11/mohe-pet', 'works.github', '墨', false, '/assets/mohe-idle-v2-cutout.png', 'works.mohe.imageAlt')}
        ${workCard('yunjian', 'works.yunjian.category', 'works.yunjian.title', 'works.yunjian.text', '/ai/yunjian', 'works.visit', '云')}
        ${workCard('writing', 'works.books.category', 'works.books.title', 'works.books.text', '/books', 'works.read', '文', true)}
      </div>
    </section>
  `
}

function booksView() {
  return `
    <section class="page-intro books-intro reveal">
      <p class="eyebrow">BOOKS & WRITING</p>
      <h1>${t('books.title')}</h1>
      <p>${t('books.intro')}</p>
      <span class="page-status">${t('books.status')}</span>
    </section>
    <section class="book-list" aria-label="${t('books.title')}">
      ${bookItem('01', 'book.yinian.category', 'book.yinian.title', 'book.yinian.text')}
      ${bookItem('02', 'book.daitian.category', 'book.daitian.title', 'book.daitian.text')}
      ${bookItem('03', 'book.poetry.category', 'book.poetry.title', 'book.poetry.text')}
    </section>
    <a class="back-link internal-link" href="/">← ${t('books.back')}</a>
  `
}

function axisItem(index, titleKey, textKey) {
  return `
    <article class="axis-item">
      <span>${index}</span>
      <h3>${t(titleKey)}</h3>
      <p>${t(textKey)}</p>
    </article>
  `
}

function profileItem(termKey, textKey) {
  return `
    <div>
      <dt>${t(termKey)}</dt>
      <dd>${t(textKey)}</dd>
    </div>
  `
}

function workCard(className, categoryKey, titleKey, textKey, href, actionKey, mark, internal = false, imageSrc = '', imageAltKey = '') {
  const external = href.startsWith('http')
  return `
    <a class="work-card ${className}${internal ? ' internal-link' : ''}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>
      <div class="work-mark" aria-hidden="true">${mark}</div>
      ${imageSrc ? `<img class="work-art" src="${imageSrc}" alt="${t(imageAltKey)}" width="700" height="700" loading="lazy" />` : ''}
      <div class="work-card-copy">
        <p class="card-category">${t(categoryKey)}</p>
        <h3>${t(titleKey)}</h3>
        <p>${t(textKey)}</p>
      </div>
      <span class="card-action">${t(actionKey)} <b aria-hidden="true">${external ? '↗' : '→'}</b></span>
    </a>
  `
}

function bookItem(index, categoryKey, titleKey, textKey) {
  return `
    <article class="book-item">
      <span class="book-index">${index}</span>
      <div>
        <p class="card-category">${t(categoryKey)}</p>
        <h2>${t(titleKey)}</h2>
      </div>
      <p>${t(textKey)}</p>
    </article>
  `
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
      if (url.pathname === '/ai/yunjian') return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.hash}`)
      render()
    })
  })
}

window.addEventListener('popstate', render)
render()
