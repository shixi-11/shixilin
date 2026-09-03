import { t } from './i18n.js'
import { socialProfiles } from './social.js'

const phrases = /《[^》]+》|AI Agent Intelligence Daily|Ink Duel: Hundred Arms|Foundation ALUX|A Mortal Life,|Born of One Thought|In Heaven’s Stead|Still Untitled|面向Steam的桌面游戏|AI智能体情报日报|AI智能体|AI炼丹师|连续创业者|数百篇|原创词作|企业孵化|自2016年起|数字文明|心理学|神智学|神秘学|家族系统排列|武当三丰派|十一資本/g
const copy = key => t(key).replace(phrases, phrase => '<span class="about-phrase">' + phrase + '</span>')
const arrow = '<span aria-hidden="true">↗</span>'
const link = (href, label) => '<a class="about-link internal-link" href="' + href + '">' + t(label) + '<span aria-hidden="true">→</span></a>'

export function aboutView() {
  return `<section class="about-page">
    <header class="about-masthead">
      <div class="about-identity">
        <p class="about-eyebrow">${t('nav.about')}</p>
        <h1>${t('home.name')}</h1>
        <p class="about-alias">${t('about.alias')}</p>
        <p class="about-roles">${t('about.roles1')}</p>
      </div>
      <div class="about-introduction">
        <p class="about-lead">${copy('about.lead')}</p>
        <p>${copy('home.aboutWriting')}</p>
      </div>
    </header>

    <section class="about-chapter" aria-labelledby="about-creation-title">
      <h2 id="about-creation-title">${t('about.creationsTitle')}</h2>
      <div class="about-chapter-body about-works">
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('about.creation.term')}</h3>${link('/books', 'home.browseBooks')}</div>
          <p>${copy('about.creation.intro')}</p>
          <p>${copy('about.creation.books')}</p>
        </article>
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('home.products')}</h3>${link('/ai', 'work.all')}</div>
          <p>${copy('about.productsText')}</p>
          <p class="about-practice-note">${copy('about.aiPractice')}</p>
        </article>
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('home.games')}</h3>${link('/games', 'about.browseGames')}</div>
          <p>${copy('about.gamesText')}</p>
        </article>
      </div>
    </section>

    <section class="about-chapter" aria-labelledby="about-ventures-title">
      <h2 id="about-ventures-title">${t('about.venturesTitle')}</h2>
      <div class="about-chapter-body">
        <p class="about-section-intro">${copy('about.business.text')}</p>
        <div class="about-affiliations">
          <a class="about-company" href="https://elevencapital.ltd/" target="_blank" rel="noopener">
            <span><strong>${t('about.companyName')}</strong><small>${t('about.companyAlias')}</small></span>
            <span class="about-company-role">${t('about.companyLabel')}</span>${arrow}
          </a>
          <a class="about-company" href="https://alux.network/" target="_blank" rel="noopener">
            <span><strong>ALUX</strong><small>Foundation ALUX</small></span>
            <span class="about-company-role">${t('home.aluxRole')}</span>${arrow}
          </a>
          <a class="about-company" href="https://concursys.io/" target="_blank" rel="noopener">
            <span><strong>ConcurSys</strong><small>concursys.io</small></span>
            <span class="about-company-role">${t('home.aluxRole')}</span>${arrow}
          </a>
        </div>
      </div>
    </section>

    <section class="about-chapter" aria-labelledby="about-experience-title">
      <h2 id="about-experience-title">${t('about.experienceTitle')}</h2>
      <div class="about-chapter-body about-studies">
        <p class="about-section-intro">${copy('about.travel.text')}</p>
        <div class="about-study">
          <h3>${t('about.practice.term')}</h3>
          <p>${copy('about.psychologyText')}</p>
          <details class="about-qualifications">
            <summary>${t('about.qualifications')}</summary>
            <ul>${[1, 2, 3, 4].map(index => '<li>' + t('about.credential' + index) + '</li>').join('')}</ul>
          </details>
        </div>
        <div class="about-study">
          <h3>${t('about.tradition.term')}</h3>
          <p>${copy('about.tradition.text')}</p>
          <p class="about-practice-note">${copy('about.tradition.practice')}</p>
        </div>
      </div>
    </section>

    <section class="about-chapter about-contact" id="contact" aria-labelledby="about-contact-title">
      <h2 id="about-contact-title">${t('about.contactTitle')}</h2>
      <div class="about-chapter-body">
        <p class="about-contact-intro">${t('about.contactIntro')}</p>
        <a class="about-mail" href="mailto:info@elevencapital.ltd"><span>info@elevencapital.ltd</span>${arrow}</a>
        <div class="about-social-directory">${socialProfiles.map(profile => '<a href="' + profile.href + '" target="_blank" rel="noopener"><span class="about-social-icon">' + profile.icon + '</span><span class="about-social-copy"><span class="about-platform">' + profile.name + '</span><span class="about-handle">' + profile.handle + '</span></span></a>').join('')}</div>
        <div class="about-public-profile"><strong>@${t('brand.name')}</strong><p>${t('about.channels')}</p></div>
      </div>
    </section>
  </section>`
}

