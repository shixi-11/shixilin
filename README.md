# shixilin.com

光之十一的个人作品入口，承载首页、AI产品索引和书籍索引。

## 正式路径

- `/`：作品总入口
- `/ai`：AI产品
- `/ai/yunjian`：云笺实际产品，由独立的 `cloud-oracle` Vercel 项目提供
- `/books`：书籍

## 本地运行

```bash
npm install
npm run dev
```

`/ai/yunjian` 的跨项目转发由 `vercel.json` 在 Vercel 生产环境完成。
