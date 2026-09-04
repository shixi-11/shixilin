import { t } from './i18n.js'

const asset = name => `/assets/design/${name}`
const stickers = ['wave', 'shy', 'received', 'facepalm', 'launch', 'tired']
const jewelry = [
  ['pendant-symbol.jpg', 'pendant-engraving-hanging.jpg', 'pendant-edge.jpg'],
  ['pendant-engraving.jpg', 'pendant-symbol-still.jpg', 'pendant-engraving-still.jpg'],
]
const merchandise = [
  { file: 'shirt-purple.jpg', key: 'shirtPurple', wide: true },
  { file: 'shirt-black.jpg', key: 'shirtBlack', wide: true },
  { file: 'shirt-blue.jpg', key: 'shirtBlue', wide: true },
  { file: 'shirt-light-blue.jpg', key: 'shirtLightBlue', wide: true },
  { file: 'shirt-outline.jpg', key: 'shirtOutline' },
  { file: 'shirt-aircraft.png', key: 'shirtAircraft' },
  { file: 'shirt-white-logo.jpg', key: 'shirtWhiteLogo' },
  { file: 'shirt-gray-logo.jpg', key: 'shirtGrayLogo' },
  { file: 'jacket-navy.png', key: 'jacket', wide: true },
  { file: 'sweatshirt-blue.jpg', key: 'sweatshirt', wide: true },
  { file: 'tote.jpg', key: 'tote' },
  { file: 'coaster-blue.png', key: 'coasterBlue' },
  { file: 'coaster-emblem.jpg', key: 'coasterEmblem' },
  { file: 'case.jpg', key: 'case' },
]
const featuredMerchandise = ['shirtPurple', 'jacket', 'tote', 'case'].map(key => merchandise.find(item => item.key === key))

export function homeDesign() {
  return `<section class="home-design" aria-labelledby="design-title">
    <div class="home-section-heading">
      <h2 class="paper-section-title" id="design-title"><a class="internal-link" href="/design">${t('design.title')}</a></h2>
      <a class="home-browse-all internal-link" href="/design">${t('design.all')}<span aria-hidden="true">→</span></a>
    </div>
    <div class="design-preview-grid">
      <a class="design-preview internal-link" href="/design#merchandise">
        <div class="design-preview-media design-merch-preview">${featuredMerchandise.map(item => `<img class="design-feature-${item.key}" src="${asset(item.file)}" alt="${t(`design.${item.key}`)}" loading="lazy" />`).join('')}</div>
        <div class="design-preview-copy"><h3>${t('design.merch.homeTitle')}</h3><p>${t('design.merch.text')}</p><span class="design-action">${t('design.view')}<span aria-hidden="true">→</span></span></div>
      </a>
      <a class="design-preview internal-link" href="/design#stickers">
        <div class="design-preview-media design-sticker-preview" aria-hidden="true"><img src="${asset('sticker-cover.jpg')}" alt="" width="3840" height="2160" loading="lazy" /></div>
        <div class="design-preview-copy"><h3>${t('design.stickers.title')}</h3><p>${t('design.stickers.text')}</p><span class="design-action">${t('design.view')}<span aria-hidden="true">→</span></span></div>
      </a>
    </div>
  </section>`
}

export function designView() {
  return `<article class="design-page">
    <header class="design-header"><h1>${t('design.title')}</h1><p>${t('design.intro')}</p></header>
    <section class="design-collection" id="merchandise" aria-labelledby="merch-title">
      <div class="design-collection-heading"><div><h2 id="merch-title">${t('design.merch.title')}</h2><p>${t('design.merch.text')}</p></div></div>
      <div class="design-merch-grid">${merchandise.map(item => `<figure class="design-work${item.wide ? ' design-work-wide' : ''}"><a class="design-work-image" href="${asset(item.file)}" target="_blank" rel="noopener" aria-label="${t(`design.${item.key}`)} · ${t('design.original')}"><img src="${asset(item.file)}" alt="${t(`design.${item.key}`)}" loading="lazy" /></a><figcaption>${t(`design.${item.key}`)}</figcaption></figure>`).join('')}</div>
    </section>
    <section class="design-collection" id="jewelry" aria-labelledby="jewelry-title">
      <div class="design-collection-heading"><div><h2 id="jewelry-title">${t('design.jewelry.title')}</h2><p>${t('design.jewelry.text')}</p></div></div>
      <div class="design-jewelry-grid">${jewelry.map((group, groupIndex) => `<div class="design-jewelry-group">${group.map((file, index) => `<a class="design-jewelry-image${index === 0 ? ' design-jewelry-lead' : ''}" href="${asset(file)}" target="_blank" rel="noopener" aria-label="${t('design.jewelry.text')} ${groupIndex + 1} · ${index + 1} · ${t('design.original')}"><img src="${asset(file)}" alt="${t('design.jewelry.text')} ${groupIndex + 1} · ${index + 1}" width="3000" height="${index === 0 ? 2000 : 4500}" loading="lazy" /></a>`).join('')}</div>`).join('')}</div>
    </section>
    <section class="design-collection" id="stickers" aria-labelledby="stickers-title">
      <div class="design-collection-heading"><div><h2 id="stickers-title">${t('design.stickers.title')}</h2><p>${t('design.stickers.text')}</p></div><button class="design-animation-toggle" type="button" aria-pressed="false" aria-controls="sticker-gallery">${t('design.play')}</button></div>
      <div class="design-sticker-grid" id="sticker-gallery">${stickers.map(key => `<figure class="design-sticker"><img src="${asset(`sticker-${key}.png`)}" data-still="${asset(`sticker-${key}.png`)}" data-animation="${asset(`sticker-${key}.gif`)}" alt="${t(`design.${key}`)}" width="1024" height="1024" loading="lazy" /><figcaption>${t(`design.${key}`)}</figcaption></figure>`).join('')}</div>
    </section>
  </article>`
}

export function bindDesign() {
  const toggle = document.querySelector('.design-animation-toggle')
  toggle?.addEventListener('click', () => {
    const playing = toggle.getAttribute('aria-pressed') !== 'true'
    document.querySelectorAll('#sticker-gallery img').forEach(img => {
      img.src = playing ? img.dataset.animation : img.dataset.still
    })
    toggle.setAttribute('aria-pressed', String(playing))
    toggle.textContent = t(playing ? 'design.pause' : 'design.play')
  })
}
