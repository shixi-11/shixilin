import './styles.css'
import { getLocale, t, toggleLocale } from './i18n.js'

const routes = {
  '/': {
    titleKey: 'meta.home',
    view: homeView,
  },
  '/ai': {
    titleKey: 'meta.ai',
    view: aiView,
  },
  '/books': {
    titleKey: 'meta.books',
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
  document.documentElement.lang = getLocale() === 'en' ? 'en' : 'zh-CN'
  app.innerHTML = shell(route.view(), pathname)
  bindNavigation()
  window.scrollTo({ top: 0 })
}

function shell(content, pathname) {
  return `
    <div class="site-shell">
      <header class="site-header">
        <a class="signature internal-link" href="/" aria-label="${t('brand.homeLabel')}">
          <span class="signature-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>光之十一</span>
        </a>
        <div class="header-actions">
          <nav class="site-nav" id="site-nav" aria-label="${t('nav.menu')}">
            ${navLink('/ai', t('nav.ai'), pathname)}
            ${navLink('/books', t('nav.books'), pathname)}
            <a href="/#about" class="internal-link">${t('nav.about')}</a>
          </nav>
          <button class="language-toggle" type="button" aria-label="${t('language.label')}">${t('language.short')}</button>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span>${t('nav.menu')}</span><i></i>
          </button>
        </div>
      </header>
      <main>${content}</main>
      <footer class="site-footer">
        <a class="signature internal-link" href="/"><span>光之十一</span></a>
        <p>${t('footer.tagline')}</p>
        <p class="copyright">© ${new Date().getFullYear()} 光之十一</p>
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
        <p class="eyebrow">shixilin.com /</p>
        <h1>${t('hero.title')}</h1>
        <p class="hero-lead">${t('hero.lead')}</p>
        <a class="line-link internal-link" href="/ai">${t('hero.action')} <span aria-hidden="true">→</span></a>
      </div>
      <div class="sky-study" aria-label="雾蓝天空与远山的抽象景象">
        <div class="sun-wash"></div>
        <div class="cloud cloud-one"></div>
        <div class="cloud cloud-two"></div>
        <div class="cloud cloud-three"></div>
        <div class="mountain mountain-far"></div>
        <div class="mountain mountain-near"></div>
        <div class="boat"><span></span></div>
        <p>${t('hero.note')}</p>
      </div>
    </section>

    <section class="collection" aria-labelledby="work-title">
      <div class="section-heading">
        <p class="eyebrow">SELECTED WORK</p>
        <h2 id="work-title">${t('work.title')}</h2>
        <p>${t('work.description')}</p>
      </div>
      <div class="portal-grid">
        ${yunjianCard('featured')}
        <a class="portal-card books-card internal-link" href="/books">
          <div class="card-index">02</div>
          <div class="book-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
          <div class="card-copy">
            <p class="card-category">${t('books.cardCategory')}</p>
            <h3>${t('books.cardTitle')}</h3>
            <p>${t('books.cardDescription')}</p>
            <span class="card-action">${t('books.enter')} <b aria-hidden="true">→</b></span>
          </div>
        </a>
      </div>
    </section>

    <section class="about" id="about">
      <div><p class="eyebrow">ABOUT</p><h2>${t('about.title')}</h2></div>
      <div class="about-copy">
        <p>${t('about.p1')}</p>
        <p>${t('about.p2')}</p>
      </div>
    </section>
  `
}

function aiView() {
  return `
    <section class="page-intro reveal">
      <p class="eyebrow">shixilin.com / ai</p>
      <h1>${t('ai.title')}</h1>
      <p>${t('ai.intro')}</p>
    </section>
    <section class="product-list" aria-label="AI产品列表">
      ${yunjianCard('wide')}
      <div class="future-note">
        <span>${t('ai.next')}</span>
        <p>${t('ai.nextDescription')}</p>
      </div>
    </section>
  `
}

function booksView() {
  return `
    <section class="page-intro books-intro reveal">
      <p class="eyebrow">shixilin.com / books</p>
      <h1>${t('books.title')}</h1>
      <p>${t('books.intro')}</p>
    </section>
    <section class="books-empty" aria-labelledby="books-status">
      <div class="open-book" aria-hidden="true"><i></i><i></i></div>
      <div>
        <p class="eyebrow">IN PROGRESS</p>
        <h2 id="books-status">${t('books.progress')}</h2>
        <p>${t('books.progressDescription')}</p>
      </div>
    </section>
    <a class="back-link internal-link" href="/">← ${t('books.back')}</a>
  `
}

function yunjianCard(variant) {
  return `
    <a class="portal-card yunjian-card ${variant}" href="/ai/yunjian">
      <div class="card-index">01</div>
      <div class="cloud-panel" aria-hidden="true">
        <div class="card-cloud"></div>
        <span>${t('yunjian.art')}</span>
      </div>
      <div class="card-copy">
        <p class="card-category">${t('yunjian.category')}</p>
        <h3>${t('yunjian.name')} <small>${t('yunjian.otherName')}</small></h3>
        <p>${t('yunjian.description')}</p>
        <span class="card-action">${t('yunjian.enter')} <b aria-hidden="true">→</b></span>
        <code>shixilin.com / ai / yunjian</code>
      </div>
    </a>
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
      const url = new URL(link.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === '/ai/yunjian') return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.hash}`)
      render()
      if (url.hash) requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView())
    })
  })
}

window.addEventListener('popstate', render)
render()
