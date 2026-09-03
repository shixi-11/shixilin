import { getLocale, t } from './i18n.js'

export const supportAddress = '0x8fEa6c988005A249355ea5b862de086b12CC77aD'
const networks = ['Ethereum', 'Arbitrum', 'Base']

export function supportView() {
  return `<section class="support-page" aria-labelledby="support-title">
    <header class="support-heading"><p class="support-eyebrow">${t('support.nav')}</p><h1 id="support-title">${t('support.title')}</h1><p>${getLocale() === 'zh' ? t('support.intro').split('，').map((phrase, index, phrases) => `<span class="support-phrase">${phrase}${index < phrases.length - 1 ? '，' : ''}</span>`).join('') : t('support.intro')}</p></header>
    <div class="support-wallet">
      <div class="support-wallet-copy">
        <p class="support-label" id="network-label">${t('support.chooseNetwork')}</p>
        <div class="support-networks" role="group" aria-labelledby="network-label">${networks.map((network, i) => `<button type="button" data-network="${network}" aria-pressed="${i === 0}">${network}</button>`).join('')}</div>
        <p class="support-assets">${t('support.assets')}</p>
        <dl class="support-details"><div><dt>${t('support.currentNetwork')}</dt><dd id="selected-network">Ethereum</dd></div><div><dt>${t('support.address')}</dt><dd><code class="wallet-address"><span>${supportAddress.slice(0, 22)}</span><span>${supportAddress.slice(22)}</span></code></dd></div></dl>
        <div class="support-copy-row"><button class="support-copy-button" type="button">${t('support.copy')}</button><span class="support-copy-status" role="status" aria-live="polite"></span></div>
      </div>
      <figure class="support-qr"><img src="/assets/support-address.svg" width="208" height="208" alt="${t('support.qrAlt')}" /><figcaption>${t('support.qrCaption')}</figcaption></figure>
      <p class="support-network-note">${t('support.networkNote')}</p>
    </div>
    <p class="support-thanks">${t('support.thanks')}</p>
  </section>`
}

export function bindSupport() {
  const root = document.querySelector('.support-page')
  if (!root) return
  root.querySelectorAll('[data-network]').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('[data-network]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)))
      root.querySelector('#selected-network').textContent = button.dataset.network
      root.querySelector('.support-copy-status').textContent = ''
    })
  })
  root.querySelector('.support-copy-button').addEventListener('click', async () => {
    const status = root.querySelector('.support-copy-status')
    try {
      await navigator.clipboard.writeText(supportAddress)
      status.textContent = t('support.copied')
    } catch {
      status.textContent = t('support.copyFallback')
    }
  })
}
