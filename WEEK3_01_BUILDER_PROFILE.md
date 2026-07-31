# Week 3 Builder Profile

## 我的 Builder 名片

| 项目 | 内容 |
| --- | --- |
| 名字 | Violet |
| 主方向 | Dev |
| 本周计划投入 | 8–10 小时，优先保证一个可公开访问、可验证的最小作品 |
| 能力 | Solidity 最小合约、Remix 部署、Read / Write 交互、Git/GitHub、JavaScript、基础链上数据解码 |
| 已有 Proof of Work | Monad Testnet `CheckIn` 部署与交互；Moss Pyth Adapter PR；Pyth 新手教程 |
| 想做的事 | 把真实 Monad 链上数据变成新人能理解、能追溯来源的产品界面 |
| 想找的队友 | 能核对事实的 Research、能组织测试的 Ops、能收敛流程的 Product & UX |
| 本周最小产出 | Monad Price Lens：无需钱包的 Pyth Monad 价格解释器 |
| Week 4 候选角色 | Dev Owner，继续负责真实数据链路与发布质量 |

## 我能为团队解决什么

我擅长把“能在命令行跑通”的链上操作整理成别人可以复现的最小流程。这周我会负责从公共 RPC 调用 Monad 上的 Pyth PriceFeed，把 `price`、`conf`、`expo` 和 `publishTime` 解码成可读结果，并把失败状态和来源证据一起展示。我的判断重点不是堆功能，而是确保页面没有钱包风险、没有假实时数据，也不会把 Oracle 字段写成交易承诺。

## 我希望队友补上的能力

- Research：确认字段含义、官方地址、Feed ID 与新鲜度边界。
- Ops：找到测试对象，设计短测试，并把反馈变成清楚的行动项。
- Product & UX：判断首屏应该展示什么、哪些术语最容易误解、什么必须暂时不做。

## 公开证明

- GitHub：[echo5177](https://github.com/echo5177)
- Week 2 Pyth Adapter：[Moss PR #146](https://github.com/nishuzumi/moss/pull/146)
- Week 2 贡献记录：[Open Source Contribution Log](WEEK2_OPEN_SOURCE_CONTRIBUTION_LOG.md)
- Week 3 固定团队：[Prism Forge Team Hub](WEEK3_TEAM_HUB.md)

## 可直接提交的说明

我选择 Dev，擅长把链上调用变成可复现的产品流程。本周负责 Monad Price Lens 的真实 Pyth 查询、数据解码、错误处理与公开发布。我希望与 Research、Ops 和 Product & UX 角色协作，补齐事实核对、用户测试和体验取舍。
