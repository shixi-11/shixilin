# 光之十一

独立产品与文字作品。

[访问网站](https://shixilin.com)

## 作品

- **[云笺](https://shixilin.com/ai/yunjian)**：以云的照片和心中所想为灵感的AI文字创作工具。
- **[书籍](https://shixilin.com/books)**：书稿、出版信息与延伸阅读。

## 网站

提供中文与英文界面，可在手机、平板和电脑上浏览。

| 页面 | 路径 |
| --- | --- |
| 首页 | `/` |
| AI产品 | `/ai` |
| 云笺 | `/ai/yunjian` |
| 书籍 | `/books` |

## 本地运行

```bash
npm install
npm run dev
```

构建与预览：

```bash
npm run build
npm run preview
```

需要 Node.js 22 或更高版本。网站使用 Vite、JavaScript 与 CSS。

线上 `/ai/yunjian` 路径通过 `vercel.json` 转发至云笺服务；本地开发仅包含首页、AI产品页与书籍页。
