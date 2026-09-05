import { readDaily, rewriteDailyText, validDailyPath } from '../lib/agent-daily.js';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const requestedPath = req.query.dailyPath ?? '';
  if (!validDailyPath(requestedPath)) return res.status(404).end('Not found');
  try {
    const upstream = await readDaily(requestedPath);
    const type = upstream.headers.get('content-type') || 'application/octet-stream';
    if (!upstream.ok) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(upstream.status === 404 ? 404 : 502).end('日报暂时无法加载，请稍后重试。');
    }
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.method === 'HEAD') return res.status(200).end();
    if (/text\/|application\/(?:json|xml|javascript)|image\/svg\+xml/i.test(type)) {
      return res.status(200).end(rewriteDailyText(await upstream.text()));
    }
    return res.status(200).end(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).end('日报暂时无法加载，请稍后重试。');
  }
}
