import { t } from './i18n.js'

const gameText = key => t(key).replace(/《[^》]+》|中国武术|中国历史|历史幻想|幻想|水墨格斗游戏|叙事游戏|格斗游戏|兵器对战|招式衔接|打击反馈|让每一次选择|每一次选择|留下痕迹|相遇与离别|轮回|记忆|选择|门派|兵器|交锋|攻防/g, phrase => `<span class="game-phrase">${phrase}</span>`)

const gameLink = (href, label, external = false) => `<a class="game-page-link${external ? '' : ' internal-link'}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}<span aria-hidden="true">${external ? '↗' : '→'}</span></a>`

export function gameCards() {
  return `<div class="home-game-list">${[
    { href: '/games/baishishu', image: '/assets/baishishu-opening.jpg', width: 1200, height: 675, key: 'game' },
    { href: '/games/ink-duel', image: '/assets/ink-duel-concept.png', width: 1672, height: 941, key: 'ink' },
  ].map(game => `<a class="game-card internal-link" href="${game.href}"><img src="${game.image}" alt="${t(`${game.key}.imageAlt`)}" width="${game.width}" height="${game.height}" loading="lazy" /><div class="game-card-copy"><div class="game-card-meta"><span>Steam · ${t('games.desktop')}</span><span>${t('games.development')}</span></div><h3>${t(`${game.key}.name`)}</h3><p>${gameText(`${game.key}.short`)}</p><span class="game-action">${t('games.details')} <span aria-hidden="true">→</span></span></div></a>`).join('')}</div>`
}

function gameFacts() {
  return `<dl class="game-facts"><div><dt>${t('games.platform')}</dt><dd>Steam</dd></div><div><dt>${t('games.device')}</dt><dd>${t('games.desktop')}</dd></div><div><dt>${t('games.status')}</dt><dd>${t('games.development')}</dd></div></dl>`
}

export function gamesView() {
  return `<section class="game-directory" aria-labelledby="games-title"><header><h1 id="games-title">${t('home.games')}</h1><p>${gameText('games.intro')}</p></header>${gameCards()}</section>`
}

function gameHeader(name, alias, category, intro, action) {
  return `<nav class="game-breadcrumb" aria-label="${t('games.breadcrumb')}"><a class="internal-link" href="/">${t('games.home')}</a><span aria-hidden="true">/</span><a class="internal-link" href="/games">${t('home.games')}</a></nav>
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
      <div><p>${gameText('ink.progress')}</p>${gameFacts()}</div>
    </section>
    ${otherGame('/games/baishishu', t('game.name'), t('game.short'))}
  </article>`
}

export function baishishuView() {
  return `<article class="game-page baishishu-page">
    ${gameHeader(t('game.name'), 'BAISHISHU', t('baishishu.category'), gameText('game.intro'), `<a class="game-page-link" href="#baishishu-preview">${t('baishishu.watch')}<span aria-hidden="true">↓</span></a>`)}
    <figure class="game-lead-image game-video" id="baishishu-preview"><video controls playsinline preload="none" poster="/assets/baishishu-opening.jpg" width="1920" height="1080" aria-label="${t('baishishu.videoLabel')}"><source src="/assets/baishishu-dream.mp4" type="video/mp4" /><a href="/assets/baishishu-dream.mp4">${t('baishishu.videoFallback')}</a></video><figcaption>${t('baishishu.videoCaption')}</figcaption></figure>
    <section class="game-editorial-section" aria-labelledby="baishishu-story-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">01</span><h2 id="baishishu-story-title">${t('baishishu.storyTitle')}</h2></div>
      <div class="game-story"><p class="game-story-lead">${gameText('game.story')}</p><p>${gameText('baishishu.story')}</p><p>${gameText('baishishu.storyMore')}</p></div>
    </section>
    <section class="game-editorial-section" aria-labelledby="baishishu-play-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">02</span><h2 id="baishishu-play-title">${t('baishishu.playTitle')}</h2></div>
      <div class="game-feature-list">${[1, 2, 3].map(i => `<div><h3>${t(`baishishu.feature${i}Title`)}</h3><p>${gameText(`baishishu.feature${i}`)}</p></div>`).join('')}</div>
    </section>
    <section class="game-editorial-section" aria-labelledby="baishishu-culture-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">03</span><h2 id="baishishu-culture-title">${t('baishishu.cultureTitle')}</h2></div>
      <div class="game-story"><p class="game-story-lead">${gameText('baishishu.cultureLead')}</p><p>${gameText('baishishu.cultureText')}</p></div>
    </section>
    <section class="game-editorial-section game-development" aria-labelledby="baishishu-progress-title">
      <div class="game-section-heading"><span class="game-section-number" aria-hidden="true">04</span><h2 id="baishishu-progress-title">${t('games.progress')}</h2></div>
      <div class="game-story"><p>${t('baishishu.progress')}</p>${gameFacts()}<p>${t('baishishu.updatesText')}</p>${gameLink('https://x.com/baishishugame', t('game.open'), true)}</div>
    </section>
    ${otherGame('/games/ink-duel', t('ink.name'), t('ink.short'))}
  </article>`
}
