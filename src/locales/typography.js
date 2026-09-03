// Keep short Japanese semantic units together in display text, without forcing line breaks.
const japanesePhrases = [
  '記憶を失った、', 'ひとすじの魂から', 'AIエージェント', '情報日報',
  'インディーゲーム', '自主制作と、', '長く続ける実験', 'プロダクトとゲーム',
  '拳法と', 'さまざまな武器', '拳の個性、', '武器の間合い',
  '間合いのなかで', '隙を探す', '技をつなぎ、', '勢を蓄える',
  'どの人生も、', '次に響く', '一つの人生を', '引き受ける',
  '出会い、', '自分で選ぶ', 'その人生の結果を', '持ち帰る',
  '日常から、', '古典の世界へ',
]

export function composeLocaleHeadings(root, locale) {
  if (locale !== 'ja') return
  const pattern = new RegExp(japanesePhrases.join('|'), 'g')
  for (const heading of root.querySelectorAll('h1, h2, h3, .paper-subtitle, .about-lead')) {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
    const nodes = []
    while (walker.nextNode()) nodes.push(walker.currentNode)
    for (const node of nodes) {
      const matches = [...node.data.matchAll(pattern)]
      if (!matches.length) continue
      const fragment = document.createDocumentFragment()
      let end = 0
      for (const match of matches) {
        fragment.append(node.data.slice(end, match.index))
        const phrase = document.createElement('span')
        phrase.className = 'locale-phrase'
        phrase.textContent = match[0]
        fragment.append(phrase)
        end = match.index + match[0].length
      }
      fragment.append(node.data.slice(end))
      node.replaceWith(fragment)
    }
  }
}
