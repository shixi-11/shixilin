import { getLocale, t } from './i18n.js'
import { books } from './content.js'

const phrases = /《[^》]+》|『[^』]+』|AI Agent Intelligence Daily|Ink Duel: Hundred Arms|Foundation ALUX|A Mortal Life,|Born of One Thought|In Heaven’s Stead|Still Untitled|面向Steam的桌面游戏|AI智能体情报日报|AI智能体|AI产品|独立游戏|从古老的思想|到不断变化的技术|AI炼丹师|连续创业者|数百篇|原创词作|企业孵化|自2016年起|数字文明|心理学|神智学|神秘学|东西方精神传统|東西方精神傳統|不同体系|不同體系|日常生活|阳明心学|陽明心學|陽明学|儒学|儒學|易学|易學|道教|佛教诸宗|佛教諸宗|五行八卦|王凤仪|王鳳儀|赫尔墨斯思想|赫爾墨斯思想|北欧符文|北歐符文|家族系统排列|武当三丰派|十一資本/g
const protectedTerms = /灵气导师|靈氣導師|武当三丰派传人|武當三豐派傳人|古鲁的宇宙观察使|古魯的宇宙觀察使|暴力美学禅者|暴力美學禪者|数字游牧者|數字遊牧者|布莱恩·魏斯博士|布萊恩·魏斯博士|时间回溯疗法|時間回溯療法|阿育吠陀疗法|阿育吠陀療法|东北仙门|東北仙門|阿格里帕|唯识宗|唯識宗|净土宗|淨土宗|天狼星|大角星|昴宿星|猎户座|獵戶座|天鹅座|天鵝座/g
const namePhrases = /“十一”|「十一」|笔名|筆名|数字|數字|十一维宇宙|十一維宇宙|西方魔法学|西方魔法學|象征意义|象徵意義|阴阳合一|陰陽合一|合十手印|阿育吠陀传统|阿育吠陀傳統|阿育吠陀|传统|傳統|见素抱朴|見素抱樸|知行合一|知世故而不世故|道生一|一生二|二生三|三生万物|三生萬物|大道归一|大道歸一|无可奈何|無可奈何|保持|白驹过隙|白駒過隙|坏事|壞事|好事|内敛|內斂|坚毅|堅毅|二元思维|二元思維|自由意志/g
const phrasePattern = new RegExp('为华夏文明的复兴|為華夏文明的復興|与汉服演员|與漢服演員|音乐与文字|音樂與文字|热衷收藏|熱衷收藏|华夏文明的复兴|華夏文明的復興|让更多人|讓更多人|行走江湖|汉服爱好者|漢服愛好者|汉服演员|漢服演員|华夏文化|華夏文化|华夏文明|華夏文明|尽一份力|盡一份力|最古老的本源面貌|不同文明|灵性是自由的|靈性是自由的|一切在源头上都是合一的|一切在源頭上都是合一的|本源面貌|拼图碎片|拼圖碎片|二元性|本来与本知|本來與本知|觉醒与扬升|覺醒與揚升|朝闻道，|朝聞道，|夕死可矣。|祝由术|祝由術|东北仙门|東北仙門|塔罗|塔羅|道家|我通过写作与创造，|认识这个世界。|我透過寫作與創造，|認識這個世界。|灵修的感悟|數字文明|数字文明|數百首|数百首|獨立遊戲|AI產品|AI智能體情報日報|AI智能體|面向Steam的桌面遊戲|AI煉丹師|連續創業者|企業孵化|從古老的思想|到不斷變化的技術|心理學|神智學|神祕學|家族系統排列|写作与创造，|是我认识世界的方式。|寫作與創造，|是我認識世界的方式。|在这里|在這裡|我关心|我關心|将近七年|將近七年|三十余国|三十餘國|海灵格|海靈格|工作坊|星际种子|星際種子|林拾汐|林师一|林師一|第十五代|师字辈传人|師字輩傳人|灵性反应疗法导师|靈性反應療法導師|武當三豐派|' + protectedTerms.source + '|九件坏事|九件壞事|那一件好事|一件好事|修行人|黑曜石|自我束缚|自我束縛|' + namePhrases.source + '|光之十一|光之境|心灵成长|心靈成長|灵修洞见|靈修洞見|所学所感|所學所感|行走|学习|學習|亲身经历|親身經歷|' + phrases.source, 'g')
// Longer editorial phrases must win over shared prefixes such as 数字.
const semanticPhrases = new RegExp([...new Set(phrasePattern.source.split('|'))].sort((a, b) => b.length - a.length).join('|'), 'g')
// Segment Chinese words first, then preserve editorial names and short phrases.
// Body copy can flow naturally without splitting a word or forcing desktop line breaks.
const segmenters = new Map()
const words = text => {
  const locale = getLocale()
  if (!locale.startsWith('zh')) return text
  if (!segmenters.has(locale)) segmenters.set(locale, new Intl.Segmenter(locale, { granularity: 'word' }))
  return [...segmenters.get(locale).segment(text)].map(({ segment, isWordLike }) =>
    isWordLike && segment.length > 1 ? `<span class="about-phrase">${segment}</span>` : segment).join('')
}
const format = text => {
  let end = 0
  let html = ''
  for (const match of text.matchAll(semanticPhrases)) {
    html += words(text.slice(end, match.index)) + `<span class="about-phrase">${match[0]}</span>`
    end = match.index + match[0].length
  }
  return html + words(text.slice(end))
}
const copy = key => format(t(key))
const paragraphs = key => t(key).split('\n\n').map(text => `<p>${format(text)}</p>`).join('')
const arrow = '<span aria-hidden="true">↗</span>'
const link = (href, label) => '<a class="about-link internal-link" href="' + href + '">' + t(label) + '<span aria-hidden="true">→</span></a>'

export function aboutView() {
  return `<section class="about-page">
    <header class="about-masthead">
      <div class="about-identity">
        <p class="about-eyebrow">${t('nav.about')}</p>
        <h1>${t('brand.name')}</h1>
        <p class="about-alias">SHIXI LIN</p>
        <dl class="about-names">
          <div><dt>${t('about.chineseNameLabel')}</dt><dd>${t('about.realName')}</dd></div>
          <div><dt>${t('about.englishNameLabel')}</dt><dd lang="en">Artemis</dd></div>
          <div><dt>${t('about.daoistNameLabel')}</dt><dd>${getLocale() === 'zh-Hant' ? '林師一' : '林师一'}</dd></div>
        </dl>
        <p class="about-earthling">${copy('about.earthling')}</p>
        <p class="about-roles">${t('about.roles1').split(/ · |・/).map(role => '<span class="about-phrase">' + role + '</span>').join('')}</p>
      </div>
      <div class="about-introduction">
        <p class="about-lead">${copy('about.lead')}</p>
        <p>${copy('about.welcome')}</p>
        <p>${copy('about.writing')}</p>
        <p>${copy('about.perspective')}</p>
      </div>
    </header>

    <div class="about-reading-layout">
      <details class="about-directory" id="about-contents">
        <summary><span><span class="about-toc-caption">${t('about.toc')}</span><span class="about-toc-current">${t('about.journeyTitle')}</span></span><span class="about-toc-chevron" aria-hidden="true"></span></summary>
        <nav class="about-toc" aria-label="${t('about.toc')}">
          <p class="about-toc-heading">${t('about.toc')}</p>
          ${[['journey', 'about.journeyTitle'], ['creation', 'about.creationsTitle'], ['ventures', 'about.venturesTitle'], ['practice', 'about.professionalTitle'], ['research', 'about.researchTitle'], ['name', 'about.name.title']].map(([id, key]) => `<a href="#${id}">${t(key)}</a>`).join('')}
        </nav>
      </details>
      <div class="about-chapters">
    <section class="about-chapter" id="journey" aria-labelledby="about-experience-title">
      <h2 id="about-experience-title">${t('about.journeyTitle')}</h2>
      <div class="about-chapter-body about-prose">
        <p>${copy('about.journey.self')}</p>
        <p>${copy('about.travel.text')}</p>
        <p>${copy('about.journey.experience')}</p>
        <p>${copy('about.journey.hanfu')}</p>
        <p>${copy('about.interests')}</p>
      </div>
    </section>

    <section class="about-chapter" id="creation" aria-labelledby="about-creation-title">
      <h2 id="about-creation-title">${t('about.creationsTitle')}</h2>
      <div class="about-chapter-body about-works">
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('about.creation.term')}</h3>${link('/books', 'home.browseBooks')}</div>
          <p>${copy('about.creation.intro')}</p>
          <p>${copy('about.creation.books')}</p>
          <div class="about-related-links">${['yinian', 'daitian', 'poetry'].map(id => {
            const book = books.find(item => item.title === `book.${id}.title`)
            return book.href ? `<a class="about-link" href="${book.href}" target="_blank" rel="noopener"><span class="about-link-label">${copy(book.title)}</span>${arrow}</a>` : link(`/books#${id}`, book.title)
          }).join('')}</div>
        </article>
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('home.products')}</h3>${link('/ai', 'work.all')}</div>
          <p>${copy('about.productsText')}</p>
          <p class="about-practice-note">${copy('about.aiPractice')}</p>
        </article>
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('home.games')}</h3>${link('/games', 'about.browseGames')}</div>
          <p>${copy('about.gamesText')}</p>
          <div class="about-related-links">${link('/games/baishishu', 'game.name')}${link('/games/ink-duel', 'ink.name')}</div>
        </article>
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('design.title')}</h3>${link('/design', 'design.all')}</div>
          <p>${copy('design.intro')}</p>
        </article>
      </div>
    </section>

    <section class="about-chapter" id="ventures" aria-labelledby="about-ventures-title">
      <h2 id="about-ventures-title">${t('about.venturesTitle')}</h2>
      <div class="about-chapter-body">
        <p class="about-section-intro">${copy('about.business.identity')}</p>
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

    <section class="about-chapter" id="practice" aria-labelledby="about-professional-title">
      <h2 id="about-professional-title">${t('about.professionalTitle')}</h2>
      <div class="about-chapter-body about-prose">
          <p>${copy('about.psychologyText')}</p>
          <p>${copy('about.professional.history')}</p>
          <ul class="about-credentials">${[1, 2, 4, 3, 5].map(index => '<li>' + copy('about.credential' + index) + (index === 5 && !['en', 'de'].includes(getLocale()) ? '<small class="about-credential-detail" lang="en">Spiritual Response Therapy (SRT)</small>' : '') + '</li>').join('')}<li>${copy('about.tradition.practice')}<span class="about-daoist-name">${copy('about.daoistName')}</span></li></ul>
      </div>
    </section>

    <section class="about-chapter" id="research" aria-labelledby="about-research-title">
      <h2 id="about-research-title">${t('about.researchTitle')}</h2>
      <div class="about-chapter-body about-prose">
        <blockquote class="about-motto"><p>${copy('about.research.motto')}</p></blockquote>
        <p>${copy('about.research.practice')}</p>
        ${paragraphs('about.tradition.text')}
        <div class="about-study">
          <h3>${t('about.research.eastTitle')}</h3>
          ${paragraphs('about.tradition.east')}
        </div>
        <div class="about-study">
          <h3>${t('about.research.westTitle')}</h3>
          <p>${copy('about.tradition.west')}</p>
        </div>
        <div class="about-study">
          <h3>${t('about.research.otherTitle')}</h3>
          <p>${copy('about.research.other')}</p>
        </div>
        <div class="about-study">
          <h3>${t('about.research.starsTitle')}</h3>
          <p>${copy('about.research.stars')}</p>
        </div>
      </div>
    </section>

    <section class="about-chapter" id="name" aria-labelledby="about-name-title">
      <h2 id="about-name-title">${t('about.name.title')}</h2>
      <div class="about-chapter-body about-prose">
        ${['intro', 'eleven', 'ten', 'one', 'light', 'mission'].map(key => `<div class="about-name-entry">${paragraphs('about.name.' + key)}</div>`).join('')}
        <div class="about-related-links"><a class="about-link" href="https://mp.weixin.qq.com/s/eIgpdSbIcSOUY4SFgaoaMg" target="_blank" rel="noopener">${t('about.name.source')}${arrow}</a></div>
      </div>
    </section>

      </div>
    </div>
  </section>`
}

let cleanupDirectory = () => {}

export function bindAbout() {
  cleanupDirectory()
  cleanupDirectory = () => {}
  const root = document.querySelector('.about-page')
  if (!root) return
  const directory = root.querySelector('.about-directory')
  const summary = directory.querySelector('summary')
  const current = directory.querySelector('.about-toc-current')
  const links = [...directory.querySelectorAll('.about-toc a')]
  const chapters = links.map(link => root.querySelector(link.hash))
  const desktop = matchMedia('(min-width: 1000px)')
  const controller = new AbortController()
  let frame = 0
  let active = ''
  const offset = () => desktop.matches ? 32 : summary.getBoundingClientRect().height + 20
  const update = () => {
    frame = 0
    const threshold = offset() + 12
    let chapter = chapters[0]
    for (const item of chapters) {
      if (item.getBoundingClientRect().top <= threshold) chapter = item
    }
    if (active === chapter.id) return
    active = chapter.id
    for (const link of links) {
      if (link.hash === '#' + active) {
        link.setAttribute('aria-current', 'location')
        current.textContent = link.textContent
      } else link.removeAttribute('aria-current')
    }
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
  const measure = () => {
    root.style.setProperty('--about-anchor-offset', offset() + 'px')
    schedule()
  }
  const syncLayout = () => { directory.open = desktop.matches; measure() }
  const observer = new ResizeObserver(measure)
  observer.observe(summary)
  observer.observe(root.querySelector('.about-chapters'))
  desktop.addEventListener('change', syncLayout, { signal: controller.signal })
  window.addEventListener('scroll', schedule, { passive: true, signal: controller.signal })
  window.addEventListener('resize', measure, { passive: true, signal: controller.signal })
  for (const link of links) {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      if (!desktop.matches) directory.open = false
      const heading = root.querySelector(link.hash + ' > h2')
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
      measure()
    }, { signal: controller.signal })
  }
  directory.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !desktop.matches && directory.open) {
      directory.open = false
      summary.focus({ preventScroll: true })
    }
  }, { signal: controller.signal })
  syncLayout()
  cleanupDirectory = () => {
    controller.abort()
    observer.disconnect()
    cancelAnimationFrame(frame)
  }
}

