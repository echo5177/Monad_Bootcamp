# Moss：给 AI Agent 加上一条可审查的 Monad 执行链

> 项目：[nishuzumi/moss](https://github.com/nishuzumi/moss)  
> 本文基于 2026-07-29 可见的公开代码和文档；Moss 仍是未审计的 alpha 软件。

## 1. 问题不在于“会不会调用函数”

让 AI 写出一段合约调用代码并不难，真正困难的是回答下面这些问题：

- 地址和 ABI 来自哪里？
- 参数的类型、单位、范围和默认值是什么？
- 一次用户操作是否包含多笔有顺序的交易？
- 交易在当前链上状态下会不会回滚？
- 实际发生的资产变化是否与用户最初的要求一致？
- 谁负责最终签名，谁有权把交易发送上链？

普通 Agent 可以猜出一个看起来合理的函数名，却不能因此获得处理用户资产的信任。链上写操作一旦签名并执行，错误不会因为“模型理解错了”而自动撤销。Moss 要解决的，就是 Agent 从自然语言走向链上操作时缺少结构、证据和责任边界的问题。

## 2. Moss 是什么

Moss 是一个面向 Monad 的开源 Agent 框架。它把协议知识封装在 Protocol package 中，再向 Agent 提供四个固定阶段：

```text
discover → load → action → simulate
```

- `discover`：发现当前注册了哪些 Protocol、Capability 和 Query；
- `load`：加载某个方法的意图、参数、风险与说明；
- `action`：执行只读 Query，或构建包含未签名交易的 Capability tree；
- `simulate`：在真实 Monad 状态上模拟交易，提取实际 Changes，并生成可检查的 Receipt。

这四步把“模型觉得应该怎么做”改成“框架能够证明自己准备做什么、模拟后发生了什么”。

## 3. Protocol package 为什么重要

Moss 没有让 Agent 自由拼接 calldata，而是让每个协议包维护自己的：

- 合约地址；
- 完整 ABI；
- 参数规则；
- Query 和 Capability；
- 未签名交易构造；
- Receipt 解析；
- 部署和 ABI 来源；
- 离线测试与真实链上测试。

这种边界会增加 Adapter 的开发工作，但它减少了运行时猜测。地址和单位不再藏在 Prompt 里，方法行为也不依赖 Agent 临时回忆。贡献者必须把这些知识写成代码、类型、测试和文档，reviewer 才能逐项检查。

## 4. Query、Capability 与 Receipt

### Query

Query 只读取状态，例如余额、授权额度或报价。它不生成交易，也不需要签名，但仍然需要明确的参数和 JSON-safe 输出。

### Capability

Capability 表示用户视角下的写操作，例如 swap、wrap 或 approve。它构建的是未签名交易，不替用户签名，也不直接发送。

### Receipt

这里的 Receipt 不只是“交易成功”四个字。Moss 会从模拟结果中提取按执行顺序排列的 Changes，例如 Event 或原生 MON 转移，再由 Protocol 的 Receipt parser 解释。框架要求解析结果完整、按顺序覆盖原始 Changes；覆盖不完整、顺序错误或模拟回滚都应该停止后续流程。

因此，一次成功模拟只能说明“在当前快照下，这组未签名交易产生了可解释的结果”。Agent 还要把资产、数量、接收方、授权和警告与用户意图逐项比较，最后的签名决定仍然属于用户。

## 5. 安全边界：Moss 不替钱包做决定

Moss 的一个重要设计是把职责拆开：

| 角色 | 负责什么 |
| --- | --- |
| Protocol package | 地址、ABI、参数、调用语义与 Receipt |
| Core / Simulator | 结构校验、模拟、Changes 和覆盖检查 |
| Agent | 选择工具、组织步骤、对齐用户意图 |
| 钱包与用户 | 审核、签名和发送 |

这不是“全自动交易机器人”的设计。Moss 明确构建和验证未签名交易，但不保管私钥、不替用户签名，也不保证未审计软件适合生产资金。

## 6. 我为什么选择 Pyth Adapter

在阅读 Moss 的目录、贡献指南、ADR 和公开 PR 后，我选择提交一个只读的 Pyth Monad Oracle Adapter。价格读取看似简单，却集中体现了 Protocol package 的价值：

1. Agent 不应自己猜 PriceFeed 地址；
2. 不应允许任意 Feed ID 混入调用；
3. 不能忽略价格发布时间；
4. ABI 和部署信息必须有可复现来源；
5. `bigint` 结果需要转换成 MCP 可以安全序列化的值。

我提交的 [PR #146](https://github.com/nishuzumi/moss/pull/146) 提议：

- 在 Core 增加 `oracle` Category；
- 增加 `@themoss/protocol-pyth`；
- 只允许 Monad 官方注册表中的 60 个 Feed；
- 使用 `getPriceNoOlderThan` 进行新鲜度检查；
- 返回价格、置信区间、指数和发布时间；
- 增加 ABI / Feed 来源哈希、离线生成测试和 Monad mainnet 只读验证；
- 把 `pyth.price` 加入默认 MCP composition。

截至本文日期，这是一份 Ready for review 的公开 PR，不代表已经被维护者接受或合并。

## 7. Moss 适合什么场景

Moss 可以用于：

- 钱包或 Agent 的余额、授权与报价查询；
- 为 swap 等操作构建并模拟未签名交易；
- 把多协议操作拆成可发现、可加载的统一接口；
- 编写带真实主网验证的 Monad Protocol Adapter；
- 研究 Agent、模拟器、钱包之间应该如何分配责任。

它不应该被理解为“接入后即可放心自动交易”。项目仍处于 alpha，模拟也不能消除区块状态变化、MEV、价格波动、合约漏洞和用户误判。

## 8. 我从 Moss 学到的东西

Week 1 我关注的是一条交易能否成功：写合约、部署、调用、在 Explorer 看见结果。Moss 让我开始关注成功之外的问题：

- 调用前的参数和来源能否审查；
- 调用后的实际变化能否完整解释；
- 失败时是否会停止，而不是静默降级；
- Agent 与钱包之间是否保留了清楚的权限边界；
- 一个贡献是否同时包含实现、类型、测试、文档与版本记录。

开源贡献的价值也不只在代码行数。一个很小的 Query，如果能把地址、ABI、输入边界、新鲜度和链上事实都说明白，比一个功能很多但无法验证的 Demo 更接近可维护的软件。

