import { socialProfiles } from './social.js'
import { getLocale, t } from './i18n.js'
import { books, dailyUrl } from './content.js'
import { gameCards } from './games.js'

export function cloudOrnament() {
  return `<svg class="cloud-ornament" viewBox="0 0 58 32" fill="none" aria-hidden="true"><path d="M15 25C5 26 3 19 8 15c2-2 5-2 8-1-1-6 3-10 8-10 5 0 8 3 9 7 5-5 13-2 12 4 8-2 13 2 11 5-2 3-9 2-14 3-9 4-17 5-27 2Z"/><path d="M17 19c-4-6 1-11 6-8 4 2 3 6 0 7m9-1c-1-4 5-6 8-3m-19 9c7 2 12-3 17-3"/></svg>`
}

export function homeView() {
  const projectText = key => t(key).replace(/小小守护者|小小守護者|安静陪伴|安靜陪伴|偶尔调皮|偶爾調皮|AI智能体|并发公链|全局逻辑虚拟机|去中心化|分布式执行|国际贸易|企业孵化|商业实践/g, phrase => `<span class="home-phrase">${phrase}</span>`)
  const subtitle = getLocale() === 'en'
    ? t('home.subtitle').split(', ').map((part, index) => `<span class="subtitle-phrase">${part}${index === 0 ? ',' : ''}</span>`).join(' ')
    : t('home.subtitle')
  return `
    <section class="paper-hero" aria-labelledby="home-title">
      <img class="landscape-art" src="/assets/landscape.png" alt="" width="1773" height="887" fetchpriority="high" />
      <div class="paper-hero-copy">
        <div class="paper-name"><h1 id="home-title">${t('home.name')}</h1>${cloudOrnament()}</div>
        <p class="paper-subtitle">${subtitle}</p>
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
            <div class="cloud-poem" aria-hidden="true"><span>${t('home.cloudPoem1')}</span><span>${t('home.cloudPoem2')}</span><i class="cloud-seal"><span>云</span><span>笺</span></i></div>
          </div>
          <div class="cloud-card-copy">
            <h3>${t('home.yunjian')}</h3>
            <span class="gold-rule" aria-hidden="true"></span>
            <p>${t('home.yunjianText')}</p>
            <a class="paper-button" href="/ai/yunjian">${t('home.openYunjian')}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></a>
            <span class="route-caption">/ai/yunjian</span>
          </div>
        </article>
        <div class="home-ai-list">
          <a class="home-ai-entry" href="${dailyUrl()}" target="_blank" rel="noopener">
            <span class="home-ai-label">ALUX</span><h3>${t('home.dailyTitle')}</h3><p>${t('home.dailyText')}</p><span class="home-ai-action">${t('home.readDaily')} <span aria-hidden="true">↗</span></span>
          </a>
          <a class="home-ai-entry" href="https://github.com/shixi-11/mohe-pet" target="_blank" rel="noopener">
            <span class="home-ai-label">${t('work.mohe.category')}</span><h3>${t('work.mohe.title')}</h3><p>${projectText('home.moheText')}</p><span class="home-ai-action">${t('home.openMohe')} <span aria-hidden="true">↗</span></span>
          </a>
        </div>
      </section>
      <section class="home-books" aria-labelledby="books-title">
        <h2 class="paper-section-title" id="books-title"><a class="internal-link" href="/books">${t('home.books')}</a></h2>
        <div class="paper-book-card">
          <div class="home-book-links">${books.filter(book => book.href).map(book => {
            const [original, translation] = t(book.title).split(' · ')
            return `<a href="${book.href}" target="_blank" rel="noopener"><span class="home-book-name">${original}${translation ? `<small>${translation}</small>` : ''}</span><span aria-hidden="true">↗</span></a>`
          }).join('')}<div class="home-book-upcoming"><span>${t('book.poetry.title').split(' · ').map((part,index) => index ? '<small>' + part + '</small>' : part).join('')}</span></div><a class="book-shelf-link internal-link" href="/books">${t('home.browseBooks')} <span aria-hidden="true">→</span></a></div>
          <img src="/assets/books.png" alt="" width="1536" height="1024" loading="lazy" />
        </div>
      </section>
    </div>
    <div class="home-project-grid">
    <section class="home-game" id="games" aria-labelledby="game-title">
      <h2 class="paper-section-title" id="game-title"><a class="internal-link" href="/games">${t('home.games')}</a></h2>
      ${gameCards()}
    </section>
    <section class="home-alux" aria-labelledby="alux-title">
      <h2 class="paper-section-title" id="alux-title">${t('home.collaborations')}</h2>
      <div class="home-collaborations">
      <a class="alux-card" href="https://elevencapital.ltd/" target="_blank" rel="noopener">
        <div class="alux-identity"><span class="game-status">${t('home.elevenRole')}</span><h3>${t('about.companyName')}</h3></div>
        <div class="alux-description"><p>${projectText('home.elevenText')}</p><span class="game-action">${t('home.openEleven')} <span aria-hidden="true">↗</span></span></div>
      </a>
      <a class="alux-card" href="https://alux.network/" target="_blank" rel="noopener">
        <div class="alux-identity"><span class="game-status">${t('home.aluxRole')}</span><h3>ALUX</h3></div>
        <div class="alux-description"><p>${projectText('home.aluxText')}</p><span class="game-action">${t('home.openAlux')} <span aria-hidden="true">↗</span></span></div>
      </a>
      <a class="alux-card" href="https://concursys.io/" target="_blank" rel="noopener">
        <div class="alux-identity"><span class="game-status">${t('home.aluxRole')}</span><h3>ConcurSys</h3></div>
        <div class="alux-description"><p>${projectText('home.concursysText')}</p><span class="game-action">${t('home.openConcursys')} <span aria-hidden="true">↗</span></span></div>
      </a>
      </div>
    </section>
    </div>
  `
}

export function paperFooter() {
  return `<footer class="paper-footer">
    <a class="paper-footer-name internal-link" href="/">${t('brand.name')}${cloudOrnament()}</a>
    <p>${t('home.subtitle')}</p>
    <div class="paper-socials">${socialProfiles.map(profile => `${profile.id === 'instagram' ? '<span aria-hidden="true"></span>' : ''}<a href="${profile.href}" target="_blank" rel="noopener" aria-label="${profile.name} · ${profile.handle}" title="${profile.name} · ${profile.handle}">${profile.icon}</a>`).join('')}</div>
    <div class="footer-contact" id="contact">
      <a class="footer-email" href="mailto:info@elevencapital.ltd"><span>${t('footer.collaborate')}</span><span>info@elevencapital.ltd</span></a>
      <p class="social-notes">${t('home.handles')}</p>
    </div>
  </footer>`
}
