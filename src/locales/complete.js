// Shared proper names and duplicate copy are resolved here; translations originate in Chinese.
// Missing translations remain an error in scripts/check-locales.mjs, never a silent English fallback.
export function complete(m) {
  const result = {
    'brand.name': '光之十一', 'brand.roman': 'SHIXI LIN', 'home.name': 'Shixi Lin',
    'about.alias': '光之十一', 'work.alux.title': 'ALUX',
    'home.yunjian': '云笺', 'work.yunjian.title': '云笺', 'work.mohe.title': '墨核',
    'game.name': '百世书', 'ink.name': '墨斗·百兵',
    'book.yinian.title': '《一念凡生》', 'book.daitian.title': '《代天行》', 'book.poetry.title': '《还没取名儿呢》',
    'about.companyName': 'Eleven Capital', 'about.companyAlias': 'Eleven Capital Limited',
    'meta.home': '光之十一 | Shixi Lin',
    ...m,
  }
  const same = {
    'booksPage.title': 'home.books', 'aiPage.title': 'home.products',
    'about.venturesTitle': 'home.collaborations', 'about.companyLabel': 'home.elevenRole',
    'game.status': 'games.development', 'game.updates': 'game.open',
    'about.creation.text': 'about.creation.books', 'footer.follow': 'home.handles',
    'about.buildText': 'about.gamesText', 'home.aboutIntro': 'home.aboutWriting',
    'about.practice.text': 'about.psychologyText',
  }
  for (const [key, source] of Object.entries(same)) result[key] ??= result[source]
  for (const [page, title] of Object.entries({ home: 'home.name', ai: 'home.products', games: 'games.nav', books: 'home.books', about: 'nav.about', support: 'support.title', baishishu: 'game.name', inkDuel: 'ink.name' })) {
    result[`meta.${page}`] ??= `${result[title]} | Shixi Lin`
  }
  return result
}
