# Week 3 Problem & Mini Demo Card

## 问题卡

| 问题 | 回答 |
| --- | --- |
| 目标用户是谁 | 正在 Monad 上学习 Oracle、调试 DApp 或构建 Agent 的初学者 |
| 具体场景 | 想确认 MON/USD 等 Pyth Feed 当前返回什么，以及这条数据是否满足自己的时间阈值 |
| 具体问题 | 原始查询需要理解 Feed ID、定点数指数、置信值和 Unix 时间，新人容易误读价格或忽略数据年龄 |
| 现在怎么解决 | 查 Pyth 文档后直接调合约、看 Explorer 原始返回值、写脚本换算，或复制给 AI 解释 |
| 现有方式的代价 | 步骤分散、学习成本高、容易算错小数位，也容易把 `conf` 当预测或把“链上”当“永远新鲜” |
| 产品如何帮助 | 直接读取官方 Pyth PriceFeed，把结果翻译成价格、置信区间、发布时间、新鲜度和可追溯证据 |

## Mini Demo 范围

**唯一核心功能：** 把一个 Monad 上的 Pyth 查询结果解释成新人能读懂、能验证的一张价格卡。

本周完成：

- MON/USD、BTC/USD、ETH/USD 三个核对过的 Feed。
- 可读价格与 `价格 ± 置信值`。
- 置信区间占价格的比例。
- 本地发布时间、数据年龄与 Fresh / Aging / Stale 文本。
- Pyth 合约、Feed ID、原始返回值和官方资料入口。
- Loading、RPC 失败、合约拒绝过期数据等状态。
- 无钱包、无签名、无交易。

本周不做：

- 钱包连接、下单、资产授权、收益承诺。
- 价格预测、历史图表、提醒和完整行情 Dashboard。
- 任意合约地址或 Feed ID 输入。
- 用户账户与个人数据收集。

## 为什么值得做

Pyth 的 EVM API 返回 `price`、`conf`、`expo` 和 `publishTime`，价格必须结合指数换算；Pyth 也建议用 `getPriceNoOlderThan()` 做新鲜度检查。Monad Price Lens 的价值不是提供更多行情，而是让用户看懂一条链上价格的数值、误差、时间与来源。

参考：[Pyth EVM API](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan)、[Pyth Best Practices](https://docs.pyth.network/price-feeds/core/best-practices)、[Monad Push Feeds](https://docs.pyth.network/price-feeds/core/push-feeds/evm#monad-mainnet)

## 可直接提交的说明

目标用户是正在 Monad 上学习 Oracle 或调试 DApp 的新人。他们需要手动理解 Feed ID、`price`、`expo`、`conf` 和时间戳，容易算错或误判新鲜度。Monad Price Lens 用一次只读查询生成可读价格卡。本周只做三个白名单 Feed、价格解释、置信区间、发布时间、新鲜度和来源证据，不做钱包、交易、预测或历史行情。
