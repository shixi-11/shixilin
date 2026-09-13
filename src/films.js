import { getLocale, t } from './i18n.js'

const collections = [
  { id: 'weiguang', path: '/ai-films/renjian-weiguang' },
  { id: 'huaxia', path: '/ai-films/huaxia-fuxing' },
]

const collectionFilms = {
  weiguang: [{ bvid: 'BV1uptW6XEPY', youtube: '7MskS11gSxU', title: 'films.later', duration: '1:54', poster: '/assets/ai-films/BV1uptW6XEPY.jpg' }],
}

const onCameraFilms = [
  { bvid: 'BV12T4y1K75F', youtube: '4w_-5YFSCxA', title: 'films.windDream', duration: '1:01', poster: '/assets/on-camera/BV12T4y1K75F.jpg?v=e1a78207476a' },
  { bvid: 'BV1XX4y1u7KS', youtube: 'wp_0xFbXLJ8', title: 'films.eightDirections', duration: '1:01', posterRatio: '8 / 5' },
  { bvid: 'BV1YV41187i6', youtube: 'Gfm6YFduTAg', title: 'films.foxSpirit', duration: '0:57', posterRatio: '3238 / 2160', poster: '/assets/on-camera/BV1YV41187i6.jpg?v=b0666283d9a9' },
  { bvid: 'BV1xute6GE4S', youtube: 'iglx3DzajwU', title: 'films.dunhuangWind', duration: '0:23' },
  { bvid: 'BV1XT411P7Yb', youtube: 'nmax--GOjKA', title: 'films.sword', duration: '0:18', posterRatio: '8 / 5' },
  { bvid: 'BV1dP411E7eH', youtube: 'AcO4VZ2ffSQ', title: 'films.silkRoad', duration: '0:17', posterRatio: '8 / 5' },
  { bvid: 'BV1hzYd6fEaa', youtube: 'yKuIKmw-AWQ', short: true, title: 'films.bowstring', duration: '0:06' },
]

export function aiFilmsView() {
  return `<section class="quiet-page films-page">
    <h1>${t('films.ai')}</h1><p>${t('films.aiIntro')}</p>
    <div class="film-collections">${collections.map(collection => `<article class="film-collection">
      <a class="internal-link film-collection-link" href="${collection.path}">
        <h2>${t(`films.${collection.id}`)}</h2>
        <span class="film-collection-action">${t('films.openCollection')} <span aria-hidden="true">→</span></span>
      </a>
    </article>`).join('')}</div>
  </section>`
}

export function filmCollectionView(id) {
  return `<section class="quiet-page films-page">
    <a class="internal-link text-link film-back" href="/ai-films"><span aria-hidden="true">←</span> ${t('films.ai')}</a>
    <h1>${t(`films.${id}`)}</h1>
    ${collectionFilms[id]?.length ? filmCards(collectionFilms[id]) : `<p class="film-empty">${t('films.empty')}</p>`}
  </section>`
}

export function personalFilmsView() {
  return `<section class="quiet-page films-page">
    <h1>${t('films.personal')}</h1><p>${t('films.personalIntro')}</p>
    ${filmCards(onCameraFilms)}
  </section>`
}

function filmCards(films) {
  return `<div class="on-camera-films">${films.map(film => {
      const links = [
        { href: `https://www.bilibili.com/video/${film.bvid}/`, label: 'films.watchBilibili' },
        { href: film.short ? `https://www.youtube.com/shorts/${film.youtube}` : `https://www.youtube.com/watch?v=${film.youtube}`, label: 'films.watchYoutube' },
      ]
      if (!getLocale().startsWith('zh')) links.reverse()
      return `<article class="on-camera-film">
      <a class="film-poster" href="${links[0].href}" target="_blank" rel="noopener" aria-label="${t(film.title)}">
        <span class="film-poster-media" style="aspect-ratio: ${film.posterRatio || '16 / 9'}">
        <img src="${film.poster || `/assets/on-camera/${film.bvid}.jpg`}" alt="" loading="lazy" decoding="async">
        <span class="film-duration">${film.duration}</span>
        </span>
      </a>
      <h2>${t(film.title)}</h2>
      <div class="film-platforms">${links.map(link => `<a class="text-link" href="${link.href}" target="_blank" rel="noopener">${t(link.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>
    </article>`}).join('')}</div>`
}
