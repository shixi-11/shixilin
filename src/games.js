import { t } from './i18n.js'

const gameText = key => t(key).replace(/《[^》]+》|中国武术|中国历史|历史幻想|幻想|水墨格斗游戏|叙事游戏|格斗游戏|兵器对战|招式衔接|打击反馈|让每一次选择|每一次选择|留下痕迹|相遇与离别|轮回|记忆|选择|门派|兵器|交锋|攻防/g, phrase => `<span class="game-phrase">${phrase}</span>`)

const gameLink = (href, label, external = false) => `<a class="game-page-link${external ? '' : ' internal-link'}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}<span aria-hidden="true">${external ? '↗' : '→'}</span></a>`

function gameHeader(name, alias, category, intro, action) {
  return `<nav class="game-breadcrumb" aria-label="${t('games.breadcrumb')}"><a class="internal-link" href="/">${t('games.home')}</a><span aria-hidden="true">/</span><a class="internal-link" href="/#games">${t('home.games')}</a></nav>
    <header class="game-masthead">
      <div><p class="game-kicker">${category}<span aria-hidden="true">·</span>${t('games.development')}</p><h1>${name}</h1><p class="game-alias">${alias}</p></div>
      <div class="game-introduction"><p>${intro}</p>${action}</div>
    </header>`
}

function otherGame(href, name, text) {
  return `<aside class="game-related"><div><span>${t('games.another')}</span><h2>${name}</h2><p>${text}</p></div>${gameLink(href, t('games.details'))}</aside>`
}

export function inkDuelView() {
  return `<article class="game-page ink-duel-page">
    ${gameHeader(t('ink.name'), 'INK DUEL · HUNDRED ARMS', t('ink.category'), gameText('ink.intro'), `<a class="game-page-link" href="#gameplay">${t('ink.explore')}<span aria-hidden="true">↓</span></a>`)}
    <figure class="game-lead-image"><img src="/assets/ink-duel-concept.png" alt="${t('ink.imageAlt')}" width="1672" height="941" fetchpriority="high" /><figcaption>${t('ink.imageCaption')}</figcaption></figure>
    <section class="game-editorial-section" id="gameplay" aria-labelledby="gameplay-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">01</span><h2 id="gameplay-title">${t('ink.playTitle')}</h2></div>
      <div class="game-feature-list">${[1, 2, 3].map(i => `<div><h3>${t(`ink.feature${i}Title`)}</h3><p>${gameText(`ink.feature${i}`)}</p></div>`).join('')}</div>
    </section>
    <section class="game-editorial-section game-development" aria-labelledby="development-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">02</span><h2 id="development-title">${t('games.progress')}</h2></div>
      <div><p>${gameText('ink.progress')}</p><dl class="game-facts"><div><dt>${t('games.platform')}</dt><dd>Windows</dd></div><div><dt>${t('games.status')}</dt><dd>${t('games.development')}</dd></div></dl>${gameLink('https://x.com/11Shixi', t('games.followCreator'), true)}</div>
    </section>
    <details class="game-studio-disclosure"><summary>${t('ink.studioCaption')}<span aria-hidden="true">+</span></summary><figure class="game-studio-image"><img src="/assets/ink-duel-studio.png" alt="${t('ink.studioAlt')}" width="6120" height="4596" loading="lazy" /></figure></details>
    ${otherGame('/games/baishishu', t('game.name'), t('game.short'))}
  </article>`
}

export function baishishuView() {
  return `<article class="game-page baishishu-page">
    ${gameHeader(t('game.name'), 'BAISHISHU', t('baishishu.category'), gameText('game.intro'), gameLink('https://x.com/baishishugame', t('game.open'), true))}
    <figure class="game-lead-image"><img src="/assets/baishishu-opening.jpg" alt="${t('game.imageAlt')}" width="1200" height="675" fetchpriority="high" /><figcaption>${t('baishishu.imageCaption')}</figcaption></figure>
    <section class="game-editorial-section" aria-labelledby="baishishu-story-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">01</span><h2 id="baishishu-story-title">${t('baishishu.storyTitle')}</h2></div>
      <div class="game-story"><p class="game-story-lead">${gameText('game.story')}</p><p>${gameText('baishishu.story')}</p></div>
    </section>
    <section class="game-editorial-section game-development" aria-labelledby="baishishu-progress-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">02</span><h2 id="baishishu-progress-title">${t('games.progress')}</h2></div>
      <div><p>${t('baishishu.progress')}</p><dl class="game-facts"><div><dt>${t('games.platform')}</dt><dd>${t('baishishu.platform')}</dd></div><div><dt>${t('games.status')}</dt><dd>${t('games.development')}</dd></div></dl>${gameLink('https://x.com/baishishugame', t('game.open'), true)}</div>
    </section>
    ${otherGame('/games/ink-duel', t('ink.name'), t('ink.short'))}
  </article>`
}
