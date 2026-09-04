import { t } from './i18n.js'

const phrases = /《[^》]+》|『[^』]+』|AI Agent Intelligence Daily|Ink Duel: Hundred Arms|Foundation ALUX|A Mortal Life,|Born of One Thought|In Heaven’s Stead|Still Untitled|面向Steam的桌面游戏|AI智能体情报日报|AI智能体|AI产品|独立游戏|从古老的思想|到不断变化的技术|AI炼丹师|连续创业者|数百篇|原创词作|企业孵化|自2016年起|数字文明|心理学|神智学|神秘学|东西方精神传统|東西方精神傳統|不同体系|不同體系|日常生活|阳明心学|陽明心學|陽明学|儒学|儒學|易学|易學|道教|佛教诸宗|佛教諸宗|五行八卦|王凤仪|王鳳儀|赫尔墨斯思想|赫爾墨斯思想|北欧符文|北歐符文|家族系统排列|武当三丰派|十一資本/g
const protectedTerms = /灵气导师|靈氣導師|武当三丰派传人|武當三豐派傳人|古鲁的宇宙观察使|古魯的宇宙觀察使|暴力美学禅者|暴力美學禪者|数字游牧者|數字遊牧者|布莱恩·魏斯博士|布萊恩·魏斯博士|时间回溯疗法|時間回溯療法|阿育吠陀疗法|阿育吠陀療法|东北仙门|東北仙門|阿格里帕|唯识宗|唯識宗|净土宗|淨土宗|天狼星|大角星|昴宿星|猎户座|獵戶座|天鹅座|天鵝座/g
const namePhrases = /“十一”|「十一」|笔名|筆名|数字|數字|十一维宇宙|十一維宇宙|西方魔法学|西方魔法學|象征意义|象徵意義|阴阳合一|陰陽合一|合十手印|阿育吠陀传统|阿育吠陀傳統|阿育吠陀|传统|傳統|见素抱朴|見素抱樸|知行合一|知世故而不世故|道生一|一生二|二生三|三生万物|三生萬物|大道归一|大道歸一|无可奈何|無可奈何|保持|白驹过隙|白駒過隙|坏事|壞事|好事|内敛|內斂|坚毅|堅毅|二元思维|二元思維|自由意志/g
const semanticPhrases = new RegExp(protectedTerms.source + '|九件坏事|九件壞事|那一件好事|一件好事|修行人|黑曜石|自我束缚|自我束縛|' + namePhrases.source + '|光之十一|光之境|心灵成长|心靈成長|灵修洞见|靈修洞見|所学所感|所學所感|行走|学习|學習|亲身经历|親身經歷|' + phrases.source, 'g')
const copy = key => t(key).replace(semanticPhrases, phrase => '<span class="about-phrase">' + phrase + '</span>')
const arrow = '<span aria-hidden="true">↗</span>'
const link = (href, label) => '<a class="about-link internal-link" href="' + href + '">' + t(label) + '<span aria-hidden="true">→</span></a>'

export function aboutView() {
  return `<section class="about-page">
    <header class="about-masthead">
      <div class="about-identity">
        <p class="about-eyebrow">${t('nav.about')}</p>
        <h1>${t('home.name')}</h1>
        <p class="about-alias">${t('about.alias')}</p>
        <p class="about-roles">${t('about.roles1').split(/ · |・/).map(role => '<span class="about-phrase">' + role + '</span>').join('')}</p>
      </div>
      <div class="about-introduction">
        <p class="about-lead">${copy('about.lead')}</p>
        <p>${copy('about.welcome')}</p>
        <p>${copy('home.aboutWriting')}</p>
      </div>
    </header>

    <nav class="about-toc" aria-label="${t('about.toc')}" id="about-contents">
      ${[['journey', 'about.journeyTitle'], ['name', 'about.name.title'], ['creation', 'about.creationsTitle'], ['ventures', 'about.venturesTitle'], ['practice', 'about.professionalTitle'], ['research', 'about.researchTitle']].map(([id, key]) => `<a href="#${id}">${t(key)}</a>`).join('')}
    </nav>

    <section class="about-chapter" id="journey" aria-labelledby="about-experience-title">
      <h2 id="about-experience-title">${t('about.journeyTitle')}</h2>
      <div class="about-chapter-body about-prose">
        <p>${copy('about.journey.self')}</p>
        <p>${copy('about.travel.text')}</p>
        <p>${copy('about.journey.experience')}</p>
        <p>${copy('about.interests')}</p>
      </div>
    </section>

    <section class="about-chapter" id="name" aria-labelledby="about-name-title">
      <h2 id="about-name-title">${t('about.name.title')}</h2>
      <div class="about-chapter-body about-prose">
        ${['intro', 'eleven', 'ten', 'one', 'light', 'mission'].map(key => `<p>${copy('about.name.' + key)}</p>`).join('')}
        <div class="about-related-links"><a class="about-link" href="https://mp.weixin.qq.com/s/eIgpdSbIcSOUY4SFgaoaMg" target="_blank" rel="noopener">${t('about.name.source')}${arrow}</a></div>
      </div>
    </section>

    <section class="about-chapter" id="creation" aria-labelledby="about-creation-title">
      <h2 id="about-creation-title">${t('about.creationsTitle')}</h2>
      <div class="about-chapter-body about-works">
        <article class="about-work">
          <div class="about-work-heading"><h3>${t('about.creation.term')}</h3>${link('/books', 'home.browseBooks')}</div>
          <p>${copy('about.creation.intro')}</p>
          <p>${copy('about.creation.books')}</p>
          <div class="about-related-links">${link('/books#yinian', 'book.yinian.title')}${link('/books#daitian', 'book.daitian.title')}${link('/books#poetry', 'book.poetry.title')}</div>
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
          <ul class="about-credentials">${[1, 2, 4, 3].map(index => '<li>' + copy('about.credential' + index) + '</li>').join('')}<li>${copy('about.tradition.practice')}</li></ul>
      </div>
    </section>

    <section class="about-chapter" id="research" aria-labelledby="about-research-title">
      <h2 id="about-research-title">${t('about.researchTitle')}</h2>
      <div class="about-chapter-body about-prose">
        <p>${copy('about.research.practice')}</p>
        <p>${copy('about.tradition.text')}</p>
        <div class="about-study">
          <h3>${t('about.research.eastTitle')}</h3>
          <p>${copy('about.tradition.east')}</p>
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

  </section>`
}

