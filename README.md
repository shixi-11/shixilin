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

主站已部署。GoDaddy DNS 仍待切换；旧 `cloud-oracle` 产品部署已删除，新 `yunjian` 部署与服务配置待恢复。当前 `vercel.json` 仍指向旧产品地址，恢复新部署后必须更新并验证，不将该路径视为已经可用。
