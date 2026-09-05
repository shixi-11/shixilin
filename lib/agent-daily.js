export const ORIGIN = 'https://alux-ai-agent-daily.vercel.app';
export const PUBLIC_PATH = '/ai/agent-daily';
export const PUBLIC_URL = `https://shixilin.com${PUBLIC_PATH}`;

export function rewriteDailyText(text) {
  return text
    .replace(/<title>([\s\S]*?)<\/title>/gi, (_, title) => {
      const clean = title.replace(/ALUX\s*/gi, '').trim();
      return `<title>${/^(?:AI智能体情报日报|AI Agent Intelligence Daily)$/.test(clean) ? 'Agent Daily · AI 日报' : clean}</title>`;
    })
    .replace(/(<meta\s+[^>]*(?:property|name)=["'](?:og:title|og:site_name|twitter:title|application-name|apple-mobile-web-app-title)["'][^>]*content=["'])ALUX\s*/gi, '$1')
    .replace(/(?<!content="Agent Daily">)<\/head>/i, '<meta name="application-name" content="Agent Daily"><meta name="apple-mobile-web-app-title" content="Agent Daily"></head>')
    .replaceAll('https://ai.alux.network/daily', PUBLIC_URL)
    .replaceAll('https://ai-agent-daily.alux.network', PUBLIC_URL)
    .replace(/(["'(\s=])\/daily(?=\/|["'#?\s)])/g, `$1${PUBLIC_PATH}`)
    .replace(/(https:\/\/shixilin\.com)?\/ai\/agent-daily\/(?=["'<>\s)])/g, (_, origin) => `${origin || ''}${PUBLIC_PATH}`);
}

export function validDailyPath(value) {
  return typeof value === 'string' && value.length < 300 &&
    !value.includes('..') && !value.includes('\\') &&
    /^(?:(?:en\/)?(?:(?:latest\/?|20\d{2}\/\d{2}\/\d{2}\/?|archive\.json))?|en\/?|assets\/[a-zA-Z0-9_./-]+|sitemap\.xml|robots\.txt|404\.html)$/.test(value);
}

export async function readDaily(path, fetcher = fetch) {
  let source = new URL(ORIGIN);
  source.pathname = `/${path}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetcher(source, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    if (!location) throw new Error('Missing origin redirect location');
    source = new URL(location, source);
    if (source.origin !== ORIGIN) throw new Error('Origin redirected outside its deployment');
  }
  throw new Error('Too many origin redirects');
}
