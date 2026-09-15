import assert from 'node:assert/strict';
import { rewriteDailyText, validDailyPath, fallbackDailyPath, readDaily, PUBLIC_URL, ORIGIN, PUBLIC_PATH } from '../lib/agent-daily.js';
for (const path of [
  '', 'en', 'en/', 'latest', 'latest/', 'en/latest', 'en/latest/',
  '2026/09/05', '2026/09/05/', 'en/2026/09/05', 'en/2026/09/05/',
  'archive.json', 'en/archive.json', 'assets/alux-mark.png', 'feed.xml', 'en/feed.xml',
  'ja', 'ja/', 'ja/latest', 'ja/latest/', 'zh-Hant', 'zh-Hant/', 'zh-Hant/2026/09/14', 'zh-Hant/2026/09/14/',
  'ar/archive.json', 'ko/feed.xml', 'live', 'live/', 'live/en', 'live/en/',
  'live/latest.json', 'live/teaser.json', 'live/2026-09-15.json', 'live/2026/09/15', 'live/2026/09/15/',
  'api/live', 'api/live.json',
]) assert.equal(validDailyPath(path), true, path);
for (const path of ['../secret', '//other.example', 'https://other.example', '%2e%2e/x', ['en/'], 'api/account']) assert.equal(validDailyPath(path), false, String(path));
assert.equal(fallbackDailyPath('ja/latest'), 'en/latest/');
assert.equal(fallbackDailyPath('ja/latest/'), 'en/latest/');
assert.equal(fallbackDailyPath('zh-Hant/2026/09/14'), '2026/09/14/');
assert.equal(fallbackDailyPath('zh-Hant/2026/09/14/'), '2026/09/14/');
assert.equal(fallbackDailyPath('en/latest'), null);
assert.equal(fallbackDailyPath('ja'), null);
assert.equal(fallbackDailyPath('live/en'), null);
const text = `<link rel="canonical" href="https://ai.alux.network/daily/"><a href="/daily/en/">EN</a><img src="/daily/assets/alux-mark.png"><a href="https://ai.alux.network/daily/2026/09/05/">issue</a><a href="https://example.org/daily/news">source</a>`;
const out = rewriteDailyText(text);
assert(out.includes(`href="${PUBLIC_URL}"`));
assert(out.includes('href="/ai/agent-daily/en/"'));
assert(out.includes('src="/ai/agent-daily/assets/alux-mark.png"'));
assert(out.includes(`href="${PUBLIC_URL}/2026/09/05/"`));
assert(out.includes('https://example.org/daily/news'));
assert(!out.includes('ai.alux.network'));
assert.equal(rewriteDailyText(out), out, 'rewriting is idempotent');
let calls = 0;
const response = await readDaily('en', async u => { assert.equal(u.origin, ORIGIN); return ++calls === 1 ? new Response(null, { status: 308, headers: { location: '/en/' } }) : new Response('ok') });
assert.equal(await response.text(), 'ok');
await assert.rejects(readDaily('', async () => new Response(null, { status: 307, headers: { location: 'https://shixilin.com/ai/agent-daily' } })), /outside/);
assert.equal(PUBLIC_PATH, '/ai/agent-daily');
console.log('Agent Daily path validation, slash aliases, fallbacks, canonical/navigation/assets rewriting and loop protection passed.');

const branded = rewriteDailyText('<head><title>ALUX AI智能体情报日报</title></head>');
assert(branded.includes('<title>Agent Daily · AI智能体日报</title>'));
assert(!branded.includes('ALUX'));
assert.equal(rewriteDailyText(branded), branded);
assert(!rewriteDailyText('<title>2026-09-05 | ALUX AI智能体情报日报</title>').includes('ALUX'));
