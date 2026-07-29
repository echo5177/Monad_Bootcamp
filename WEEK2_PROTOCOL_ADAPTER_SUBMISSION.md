# Week 2｜为 Moss 新增一个 Protocol Adapter｜提交入口

## 必交内容

1. PR 链接：<https://github.com/nishuzumi/moss/pull/146>
2. GitHub Profile：<https://github.com/echo5177>
3. Adapter 名称：**Pyth Monad Oracle Adapter**

## 100 字以内功能说明

为 Moss 新增只读 Pyth PriceFeed Query，支持 Monad 官方 60 个 Feed，并用 `getPriceNoOlderThan` 强制新鲜度检查，返回 JSON-safe 价格、置信区间、指数和发布时间。

## 可选证据

- Adapter package：<https://github.com/echo5177/moss/tree/agent/pyth-oracle-adapter/packages/protocols/pyth>
- 贡献日志：<https://github.com/echo5177/Monad_Bootcamp/blob/main/WEEK2_OPEN_SOURCE_CONTRIBUTION_LOG.md>
- 实现 commit：<https://github.com/echo5177/moss/commit/0dd44137142b283ee010ed9e96441ffe85a2996a>
- Review / merge：当前尚无，后续以 PR 页面更新

