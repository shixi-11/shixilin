const supported = new Set(['zh', 'zh-Hant', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ar'])

export function browserLocale(languages = []) {
  for (const language of languages) {
    if (typeof language !== 'string') continue
    const parts = language.toLowerCase().replaceAll('_', '-').split('-')
    if (parts[0] === 'zh') {
      if (parts.includes('hans')) return 'zh'
      return parts.some(part => ['hant', 'tw', 'hk', 'mo'].includes(part)) ? 'zh-Hant' : 'zh'
    }
    if (supported.has(parts[0])) return parts[0]
  }
  return null
}

const countryGroups = {
  zh: ['CN', 'SG'],
  'zh-Hant': ['TW', 'HK', 'MO'],
  ja: ['JP'],
  ko: ['KR'],
  es: ['ES', 'MX', 'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'GT', 'HN', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE'],
  fr: ['FR', 'MC', 'BE', 'LU', 'SN', 'CI', 'BF', 'ML', 'NE', 'TG', 'BJ', 'GA', 'CG', 'CD', 'GN'],
  de: ['DE', 'AT', 'LI', 'CH'],
  ar: ['AE', 'SA', 'EG', 'DZ', 'BH', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'OM', 'PS', 'QA', 'SD', 'SY', 'TN', 'YE'],
}
const countryLanguages = new Map(Object.entries(countryGroups).flatMap(([locale, countries]) => countries.map(country => [country, locale])))

export function countryLocale(country) {
  return countryLanguages.get(typeof country === 'string' ? country.toUpperCase() : '') || 'en'
}
