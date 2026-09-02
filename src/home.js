import { socialProfiles } from './social.js'
import { t } from './i18n.js'
import { books } from './content.js'

export function cloudOrnament() {
  return `<svg class="cloud-ornament" viewBox="0 0 58 32" fill="none" aria-hidden="true"><path d="M15 25C5 26 3 19 8 15c2-2 5-2 8-1-1-6 3-10 8-10 5 0 8 3 9 7 5-5 13-2 12 4 8-2 13 2 11 5-2 3-9 2-14 3-9 4-17 5-27 2Z"/><path d="M17 19c-4-6 1-11 6-8 4 2 3 6 0 7m9-1c-1-4 5-6 8-3m-19 9c7 2 12-3 17-3"/></svg>`
}

export function homeView() {
  return `
    <section class="paper-hero" aria-labelledby="home-title">
      <img class="landscape-art" src="/assets/landscape.png" alt="" width="1773" height="887" fetchpriority="high" />
      <div class="paper-hero-copy">
        <div class="paper-name"><h1 id="home-title">${t('home.name')}</h1>${cloudOrnament()}</div>
        <p class="paper-subtitle">${t('home.subtitle')}</p>
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="paper-intro"><span>${t('home.intro1')}</span><span>${t('home.intro2')}</span></p>
      </div>
    </section>
    <div class="home-grid">
      <section class="home-products" id="products" aria-labelledby="products-title">
        <h2 class="paper-section-title" id="products-title"><a class="internal-link" href="/ai">${t('home.products')}</a></h2>
        <article class="cloud-card">
          <div class="cloud-picture">
            <img src="/assets/cloud.png" alt="${t('home.cloudAlt')}" width="1536" height="1024" />
            <div class="cloud-poem" aria-hidden="true"><span>${t('home.cloudPoem1')}</span><span>${t('home.cloudPoem2')}</span><i>云笺</i></div>
          </div>
          <div class="cloud-card-copy">
            <h3>${t('home.yunjian')}</h3>
            <span class="gold-rule" aria-hidden="true"></span>
            <p>${t('home.yunjianText')}</p>
            <a class="paper-button" href="/ai/yunjian">${t('home.openYunjian')}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></a>
            <span class="route-caption">/ai/yunjian</span>
          </div>
        </article>
      </section>
      <section class="home-books" aria-labelledby="books-title">
        <h2 class="paper-section-title" id="books-title"><a class="internal-link" href="/books">${t('home.books')}</a></h2>
        <div class="paper-book-card">
          <div class="home-book-links"><span class="book-reading-label">${t('books.read')}</span>${books.filter(book => book.href).map(book => `<a href="${book.href}" target="_blank" rel="noopener">${t(book.title).split(' · ')[0]} <span aria-hidden="true">↗</span></a>`).join('')}<a class="book-shelf-link internal-link" href="/books">${t('home.browseBooks')} <span aria-hidden="true">→</span></a></div>
          <img src="/assets/books.png" alt="" width="1536" height="1024" loading="lazy" />
        </div>
      </section>
    </div>
    <div class="home-project-grid">
    <section class="home-game" id="games" aria-labelledby="game-title">
      <h2 class="paper-section-title" id="game-title">${t('home.games')}</h2>
      <div class="home-game-list">
      <a class="game-card internal-link" href="/games/baishishu">
        <img src="/assets/baishishu-opening.jpg" alt="${t('game.imageAlt')}" width="1200" height="675" loading="lazy" />
        <div><span class="game-status">${t('games.development')}</span><h3>${t('game.name')}</h3><p>${t('game.short')}</p><span class="game-action">${t('games.details')} <span aria-hidden="true">→</span></span></div>
      </a>
      <a class="game-card internal-link" href="/games/ink-duel">
        <img src="/assets/ink-duel-concept.png" alt="${t('ink.imageAlt')}" width="1672" height="941" loading="lazy" />
        <div><span class="game-status">${t('games.development')}</span><h3>${t('ink.name')}</h3><p>${t('ink.short')}</p><span class="game-action">${t('games.details')} <span aria-hidden="true">→</span></span></div>
      </a>
      </div>
    </section>
    <section class="home-alux" aria-labelledby="alux-title">
      <h2 class="paper-section-title" id="alux-title">${t('home.collaborations')}</h2>
      <a class="alux-card" href="https://alux.network/" target="_blank" rel="noopener">
        <span class="game-status">${t('home.aluxRole')}</span><h3>ALUX</h3>
        <p>${t('home.aluxText')}</p>
        <span class="game-action">${t('home.openAlux')} <span aria-hidden="true">↗</span></span>
      </a>
    </section>
    </div>
  `
}

export function paperFooter() {
  return `<footer class="paper-footer">
    <a class="paper-footer-name internal-link" href="/">${t('brand.name')}${cloudOrnament()}</a>
    <p>${t('home.subtitle')}</p>
    <div class="paper-socials">${socialProfiles.map(profile => `${profile.id === 'github' ? '<span aria-hidden="true"></span>' : ''}<a href="${profile.href}" target="_blank" rel="noopener" aria-label="${profile.name} · ${profile.handle}" title="${profile.name} · ${profile.handle}">${profile.icon}</a>`).join('')}</div>
    <div class="footer-contact">
      <a class="footer-email" href="mailto:info@elevencapital.ltd"><span>${t('footer.collaborate')}</span><span>info@elevencapital.ltd</span></a>
      <p class="social-notes">${t('home.handles')}</p>
    </div>
  </footer>`
}
