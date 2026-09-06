import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// SHIXILIN_NODE_MODULES can point to an existing runtime that provides sharp.
const require = createRequire(process.env.SHIXILIN_NODE_MODULES
  ? `${process.env.SHIXILIN_NODE_MODULES}/package.json`
  : import.meta.url)
const sharp = require('sharp')
const root = new URL('../', import.meta.url)
const output = new URL('design/分享图/', root)
await mkdir(output, { recursive: true })
const landscape = (await readFile(new URL('public/assets/landscape.png', root))).toString('base64')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fade"><stop offset="0" stop-color="black"/><stop offset=".24" stop-color="white"/></linearGradient>
    <linearGradient id="bottom" x2="0" y2="1"><stop offset="0" stop-color="black"/><stop offset=".16" stop-color="white"/><stop offset=".78" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>
    <mask id="landscape-mask"><rect x="330" y="55" width="870" height="435.25" fill="url(#fade)"/></mask>
    <mask id="bottom-mask"><rect x="330" y="55" width="870" height="435.25" fill="url(#bottom)"/></mask>
  </defs>
  <rect width="1200" height="630" fill="#f8f7f3"/>
  <g mask="url(#bottom-mask)"><image x="330" y="55" width="870" height="435.25" preserveAspectRatio="xMidYMid meet" mask="url(#landscape-mask)" xlink:href="data:image/png;base64,${landscape}"/></g>
  <g transform="translate(82 66)" fill="none" stroke="#a38a54">
    <circle cx="25" cy="25" r="23" stroke-width="1.5"/>
    <path d="M16 19h18M25 10v23M16 37h18" stroke-width="1.8"/>
  </g>
  <text x="150" y="101" font-family="Noto Serif SC" font-size="19" letter-spacing="3.5" fill="#68736c">SHIXI LIN</text>
  <text x="79" y="261" font-family="Noto Serif SC" font-weight="500" font-size="88" letter-spacing="4" fill="#25352f">光之十一</text>
  <path d="M86 306h61" stroke="#ab9055" stroke-width="2"/>
  <text x="82" y="363" font-family="Noto Serif SC" font-size="28" fill="#39483f">独立作品与长期实验</text>
  <text x="83" y="411" font-family="Noto Serif SC" font-size="21" fill="#59675f">文字 · AI产品 · 独立游戏</text>
  <path d="M84 515h1032" stroke="#d5d4c8" stroke-width="1"/>
  <text x="84" y="558" font-family="Noto Serif SC" font-size="22" letter-spacing="1" fill="#43554b">shixilin.com</text>
</svg>`
await writeFile(new URL('20260906_光之十一_TG预览图.svg', output), svg)
const buffer = Buffer.from(svg)
await sharp(buffer, { density: 230.4 }).resize(3840, 2016).jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toFile(fileURLToPath(new URL('20260906_光之十一_TG预览图.jpg', output)))
await sharp(buffer, { density: 144 }).resize(1200, 630).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(fileURLToPath(new URL('public/assets/og-shixilin.jpg', root)))
console.log('Created 3840×2016 master and 1200×630 website share image.')
