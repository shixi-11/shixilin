# shixilin.com

光之十一的个人作品入口，承载首页、AI产品索引和书籍索引。

## 正式路径

- `/`：作品总入口
- `/ai`：AI产品
- `/ai/yunjian`：云笺实际产品，目标为独立的 `yunjian` Vercel 项目
- `/books`：书籍

## 本地运行

```bash
npm install
npm run dev
```

`/ai/yunjian` 的跨项目转发由 `vercel.json` 在 Vercel 生产环境完成。

## 接入状态（2026-09-03）

主站与独立的 `yunjian` 项目均已部署到原 ALUX Pro 团队。`/ai/yunjian` 转发至新项目的稳定生产地址 `https://yunjian-omega.vercel.app/ai/yunjian`，不再依赖已删除的旧部署。

GoDaddy DNS 仍待切换。云笺页面与 API 已部署，但新项目尚未接回原 Supabase 配置；上传、账号与云笺生成仍待恢复，页面可访问不代表完整产品流程已验收。
