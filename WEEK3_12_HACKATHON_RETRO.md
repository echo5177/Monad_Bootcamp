# Week 3 Hackathon Prep & Team Retro

## 团队决定

**继续，但调整验证顺序。**

Monad Price Lens 已经证明三件事：浏览器能直接读取 Monad 上的 Pyth 数据；原始字段能被转换成可理解的结果卡；用户反馈可以推动具体改进。Week 4 不急着增加图表或钱包，而是先补真人验证和数据来源稳定性。

## Week 3 完成了什么

- 固定四个角色、责任、协作规则和安全边界。
- 用官方 Pyth 资料验证问题，完成 Problem Card 和 Dev 流程图。
- 实现三个 Feed 的真实 Monad 查询、ABI 解码、错误状态和来源证据。
- 发布 GitHub Pages，保留 V1/V2 两份截图和测试。
- 完成三个独立 AI 体验预检，并把反馈落到 Confidence、时区、区块锚点和可访问性。
- 实际体验另一位训练营成员的 Monad Omikuji，并记录启发。
- 建立公开反馈 Issue，等待三名真人同学回复。

## Week 4 计划

| 优先级 | 行动 | 验收 |
| --- | --- | --- |
| P0 | 邀请三名真人同学完成 5 分钟测试 | 三条匿名回复，能判断价格、Confidence 和 Fresh |
| P0 | 检查 Pyth 合约与代理实现漂移 | 页面和文档能发现地址或实现变化，不静默使用旧配置 |
| P1 | 生成带 Feed、maxAge、block 的可分享查询链接 | 打开链接可复现同一证据上下文 |
| P1 | 增加错误状态说明和重试指引 | RPC 超时、过期和无返回可被区分 |
| P2 | 评估是否接入已合并的 Moss Pyth Adapter | 只在 PR 审查完成且依赖收益明确时接入 |

明确不做：钱包连接、交易、价格预测、收益承诺和完整历史行情平台。

## 需要的帮助

1. 三名没有 Pyth 背景的真人同学，按 [Feedback Issue #1](https://github.com/echo5177/Monad_Bootcamp/issues/1) 完成体验。
2. 熟悉 Pyth 代理合约升级的 reviewer，检查地址、ABI 与实现漂移风险。
3. 助教判断：对入门工具而言，Fresh 是否应该只展示用户阈值，还是同时给出 Pyth heartbeat 的参考信息。

## Violet 的个人复盘

**我的责任：** 我负责 Dev 实现、真实查询验证、GitHub 发布和最终范围判断。

**证据：** [在线 Demo](https://echo5177.github.io/Monad_Bootcamp/)、[源码](docs/)、[4 项测试](tests/price-utils.test.mjs)、[V1/V2 改进记录](WEEK3_09_FEEDBACK_ITERATION.md)。

**最大收获：** “链上真实”只是第一层。一个结果还需要解释定点数、置信区间、时间阈值和证据锚点，用户才有能力判断它能否用于自己的场景。

**我做的人工判断：** 拒绝为了看起来像 DApp 而连接钱包；保留原始证据但不让它抢占首屏；把 AI 测试明确写成预检；没有真人反馈时保留缺口。

**是否继续与当前团队协作：** 继续。Research、Ops 和 Product 视角分别发现了纯 Dev 容易忽略的来源风险、测试标准和表达问题。Violet 仍保留最终发布和安全责任。

## 可直接提交的说明

团队选择“继续但调整验证顺序”。本页包含 Week 3 完成项、Week 4 计划、所需帮助，以及个人责任、证据、收获、人工判断和继续协作理由。
