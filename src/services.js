import { t } from './i18n.js'

const services = ['psychology', 'esoterica', 'business', 'learning', 'products', 'design']
const copy = key => t(key).replace(/选择和使用AI工具|選擇和使用AI工具|AI工具|AI产品|AI產品|商业模式|商業模式|心理咨询|心理諮詢|自我认识|自我認識|适合自己的下一步|適合自己的下一步|日常工作|实际流程|實際流程|下一步行动|下一步行動|具体问题|具體問題|独立创作|獨立創作|技术实践|技術實踐|相关传统|相關傳統|当下的处境|當下的處境|个人成长|個人成長|创业过程|創業過程|相互呼应|相互呼應|形式与内容|形式與內容|视觉设计|視覺設計|界面设计|介面設計|周边设计|周邊設計|视频制作|影片製作|合作方式|目前的阶段|目前的階段|希望获得怎样的帮助|希望獲得怎樣的協助|协作开发|協作開發|需求梳理|产品实现|產品實現/g, phrase => `<span class="service-phrase">${phrase}</span>`)

const description = service => {
  const content = copy(`services.${service}.text`)
  return service === 'design' ? content.replace('，以及', '，<br class="service-copy-break">以及') : content
}

export function servicesView() {
  return `<section class="services-page">
    <header class="services-header">
      <h1>${t('services.title')}</h1>
      <p>${copy('services.intro')}</p>
    </header>
    <ol class="service-directory">
      ${services.map((service, index) => `<li class="service-item">
        <span class="service-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
        <h2>${t(`services.${service}.title`)}</h2>
        <p>${description(service)}</p>
      </li>`).join('')}
    </ol>
    <section class="services-inquiry" aria-labelledby="services-inquiry-title">
      <h2 id="services-inquiry-title">${t('services.inquiry.title')}</h2>
      <p>${copy('services.inquiry.text')}</p>
      <a class="services-contact internal-link" href="/services#contact">${t('services.inquiry.action')}<span aria-hidden="true">↓</span></a>
    </section>
  </section>`
}
