# Week 3 Team Mini Demo: Monad Price Lens

## 作品入口

- 在线 Demo：[https://echo5177.github.io/Monad_Bootcamp/](https://echo5177.github.io/Monad_Bootcamp/)
- GitHub 仓库：[echo5177/Monad_Bootcamp](https://github.com/echo5177/Monad_Bootcamp)
- Demo 源码：[docs/](docs/)
- V2 截图：[monad-price-lens-v2.png](docs/screenshots/monad-price-lens-v2.png)
- 反馈改进：[WEEK3_09_FEEDBACK_ITERATION.md](WEEK3_09_FEEDBACK_ITERATION.md)

## 这是什么

Monad Price Lens 是一个无需钱包的 Pyth Monad 价格解释器。用户选择 MON/USD、BTC/USD 或 ETH/USD 和一个 maxAge，页面就会在指定 Monad 区块执行只读 `eth_call`，把原始 Oracle 数据翻译成价格、置信区间、发布时间和新鲜度判断。

## 怎么使用

1. 打开在线 Demo。
2. 选择一个 Feed 和 Maximum age。
3. 点击 `Read from Monad`。
4. 阅读价格、置信值、置信比例、价格区间、发布时间和 FRESH / AGING 状态。
5. 展开“查看链上来源与原始数据”，核对区块、RPC、Pyth 合约、Feed ID 和 ABI 返回。

## 真实链上与 Mock

| 部分 | 边界 |
| --- | --- |
| Feed 查询 | 真实 Monad Mainnet 公共 RPC |
| 合约调用 | 真实 Pyth `getPriceNoOlderThan` |
| 价格、置信值、时间、区块 | 由当次 RPC 返回实时解码 |
| 钱包与交易 | 不存在，不连接、不签名、不发交易 |
| 截图 | 指定时刻的证据快照，不代表之后的实时价格 |
| AI Tester | 体验预检，不冒充真人同学 |

网络或合约查询失败时页面显示 Error，不会用缓存或 Mock 假装成功。

## 团队分工

- Violet：Dev Owner，负责代码、真实数据链路、测试、截图、发布和最终判断。
- 岚舟：Research，负责 Pyth 字段、来源、新鲜度和风险核对。
- 橙子：Ops，负责测试任务、协作规则、反馈框架和演示节奏。
- 墨尺：Product & UX，负责用户问题、最短流程、界面状态和范围取舍。

岚舟、橙子和墨尺是固定角色 Agent，不是真人队友；这一点在 [Team Hub](WEEK3_TEAM_HUB.md) 中公开说明。

## AI 与人工判断

AI 协助研究、文案、代码初稿、测试清单和三视角预检。Violet 人工决定只做只读路径、核对官方地址和函数选择器、验证真实 RPC 返回、拒绝钱包与交易范围，并检查每条公开材料是否泄露敏感信息。真人反馈没有获得时，不补造结果。

## 三分钟介绍

| 时间 | 内容 |
| --- | --- |
| 0:00–0:20 | 问题：链上有价格，但新人容易误读 Feed ID、指数、置信值和时间戳 |
| 0:20–0:40 | 方案：一个无需钱包的 Monad Pyth 价格解释器 |
| 0:40–1:40 | 现场选择 MON/USD，查询并解释价格、Confidence、时间和 FRESH |
| 1:40–2:05 | 展开 Evidence，展示区块、RPC、合约、Feed ID 与原始返回 |
| 2:05–2:30 | 说明真实链上、截图、AI 预检和人工决定的边界 |
| 2:30–2:50 | 展示 V1/V2，对比置信比例、时区和可访问性改进 |
| 2:50–3:00 | Week 4：补三名真人测试，继续做合约漂移检查和可分享查询证据 |

## 作品集 / 简历一句话

Built and published a wallet-free Monad price explainer that decodes Pyth EVM price feeds, surfaces confidence and freshness evidence, and records AI-assisted usability iteration with reproducible tests.

## Week 4 问题

怎样让一条可分享的 Oracle 查询在合约升级、RPC 变化和不同用户时区下仍然可复现，同时让至少三名真人新手正确理解 Confidence 和 Fresh？

## 可直接提交的说明

作品链接、源码、截图、三分钟介绍、团队分工、真实/Mock 边界、AI/人工边界、作品集一句话和 Week 4 问题都集中在本页。
