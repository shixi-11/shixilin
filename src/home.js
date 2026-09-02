import { t } from './i18n.js'
import { books } from './content.js'

export function cloudOrnament() {
  return `<svg class="cloud-ornament" viewBox="0 0 58 32" fill="none" aria-hidden="true"><path d="M15 25C5 26 3 19 8 15c2-2 5-2 8-1-1-6 3-10 8-10 5 0 8 3 9 7 5-5 13-2 12 4 8-2 13 2 11 5-2 3-9 2-14 3-9 4-17 5-27 2Z"/><path d="M17 19c-4-6 1-11 6-8 4 2 3 6 0 7m9-1c-1-4 5-6 8-3m-19 9c7 2 12-3 17-3"/></svg>`
}

export function homeView() {
  return `
    <section class="paper-hero" aria-labelledby="home-title">
      <img class="landscape-art" src="/assets/landscape.png" alt="" width="1536" height="512" fetchpriority="high" />
      <div class="paper-hero-copy">
        <div class="paper-name"><h1 id="home-title">${t('home.name')}</h1>${cloudOrnament()}</div>
        <p class="paper-subtitle">${t('home.subtitle')}</p>
        <span class="gold-rule" aria-hidden="true"></span>
        <p class="paper-intro"><span>${t('home.intro1')}</span><span>${t('home.intro2')}</span></p>
      </div>
    </section>
    <div class="home-grid">
      <section class="home-products" id="products" aria-labelledby="products-title">
        <h2 class="paper-section-title" id="products-title">${t('home.products')}</h2>
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
    <section class="home-game" aria-labelledby="game-title">
      <h2 class="paper-section-title" id="game-title">${t('home.games')}</h2>
      <a class="game-card" href="https://x.com/baishishugame" target="_blank" rel="noopener">
        <img src="/assets/baishishu-opening.jpg" alt="${t('game.imageAlt')}" width="1200" height="675" loading="lazy" />
        <div><span class="game-status">${t('game.status')}</span><h3>${t('game.name')}</h3><p>${t('game.short')}</p><span class="game-action">${t('game.open')} <span aria-hidden="true">↗</span></span></div>
      </a>
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
    <div class="paper-socials">
      <a class="twitter-link" href="https://x.com/11Shixi" target="_blank" rel="noopener" aria-label="X / Twitter · @11Shixi" title="X / Twitter · @11Shixi"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 3 13 18h3L7 3H4Zm0 18L11 13M20 3l-7 8"/></svg></a>
      <a href="https://www.instagram.com/shixi_11/" target="_blank" rel="noopener" aria-label="Instagram · @shixi_11" title="Instagram · @shixi_11"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg></a>
      <a href="https://www.tiktok.com/@shixilin" target="_blank" rel="noopener" aria-label="TikTok · @shixilin" title="TikTok · @shixilin"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
      <span aria-hidden="true"></span>
      <a href="https://github.com/shixi-11" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg></a>
    </div>
    <p class="social-notes">${t('home.handles')}</p>
  </footer>`
}
