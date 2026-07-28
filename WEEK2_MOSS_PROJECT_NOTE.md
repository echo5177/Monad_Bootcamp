# Week 2｜认识一个开源项目：Moss

> 调研日期：2026-07-28（UTC+8）
>
> 项目仓库：[nishuzumi/moss](https://github.com/nishuzumi/moss)
>
> 证据范围：项目 README、中文 Getting Started、MCP 工具说明、安全模型、贡献指南与公开 Issues。

## 1. 项目简介

Moss 是一个面向 Monad 的开源 Agent 框架。它把链上协议的地址、ABI、参数规则、交易构造和 Receipt 解析封装成 Agent 可以发现和调用的 Capability，并提供一条固定流程：

```text
discover → load → action → simulate
```

- `discover`：按操作或协议发现可用的 Capability / Query。
- `load`：读取具体方法的意图、风险和参数契约。
- `action`：执行只读 Query，或为写操作构建 Capability tree 和未签名交易。
- `simulate`：在 Monad 状态上模拟交易，解析有序 Changes，并生成经过覆盖校验的 Receipt。

Moss 当前面向 Monad Mainnet（Chain ID `143`），支持 WMON、ERC-20、ERC-721、ERC-1155、Kuru 和 PancakeSwap 等协议或标准。它是未经审计的 alpha 软件，官方明确提醒不要使用生产资金。

## 2. Moss 解决的核心问题

普通 AI Agent 可以生成文字或代码，但不能因为“知道合约函数名”就安全地操作链上协议。真实交互还需要处理：

1. 正确的合约地址和 ABI；
2. 参数类型、单位、默认值和限制；
3. 多笔交易的先后关系，例如先授权再交换；
4. 交易执行前的模拟和失败处理；
5. 实际链上 Changes 是否与用户原始意图一致；
6. 私钥、签名和发送权不能交给未经约束的 Agent。

Moss 的做法不是让 Agent 自由拼接 calldata，而是把协议知识放进经过审查的 Protocol package。Agent 只能通过明确的参数契约构建未签名交易，随后必须模拟并检查 Receipt；真正的签名和发送仍留给用户的钱包。

## 3. 核心能力

| 能力 | 作用 | 对 Agent 的价值 |
| --- | --- | --- |
| Protocol / Capability | 将协议操作封装成统一接口 | Agent 不需要直接处理原始 ABI 和多调用细节 |
| Query | 读取报价、余额、授权额度等状态 | 只读操作不生成交易 |
| Capability tree | 表达一笔或多笔有顺序的写操作 | 可以表示授权、交换等组合流程 |
| Simulation | 使用 `debug_traceCall` 模拟真实状态 | 在签名前发现回滚或证据不足 |
| Change / Receipt | 按执行顺序解释 Event 与原生 MON 转移 | 用结构化结果核对实际发生了什么 |
| Warning / fail closed | 遇到回滚、解析或覆盖错误立即停止 | 避免 Agent 忽略错误后继续执行 |
| MCP server / SDK | 同时支持 Agent 工具调用和代码集成 | 可接入 MCP Client，也可作为 TypeScript 库使用 |

## 4. 为什么 AI Agent 需要框架

AI 的优势是理解自然语言、选择工具和组织步骤，但它可能猜错地址、单位、方法或执行结果。链上写操作又具有资金风险和不可逆性，所以不能把“模型认为正确”当作“交易已经安全”。

Moss 把不同责任拆开：

- Protocol package 负责协议知识和交易构造；
- Core 与 Simulator 负责结构校验和模拟证据；
- Agent 负责把用户意图与结果逐项对齐；
- 钱包和用户负责最终审核、签名与发送。

我认为它的关键价值不是“让 AI 自动交易”，而是给 Agent 增加可审查、可模拟、失败即停止的执行边界。

## 5. 可能的使用场景

1. Monad 钱包助手：查询余额、授权额度和报价，并准备未签名交易。
2. DEX 操作助手：比较可用 Capability，构建并模拟 swap。
3. 社区任务工具：为奖励领取、NFT 转移等链上动作准备安全流程。
4. 多协议操作入口：用统一的发现和加载流程降低不同 DApp 的交互差异。
5. 开发与测试工具：Protocol 开发者用真实主网状态验证 ABI、地址、Receipt 与失败路径。

这些场景仍然需要钱包确认和人工风险判断；一次干净的模拟只能证明当前快照下的结果可解释，不能保证稍后的真实交易一定相同。

## 6. 我的理解

在 Week 1，我把钱包签名、合约调用和 Explorer 证据理解为一条人工操作链。Moss 让我看到，当 Agent 参与这条链时，还需要三个额外层次：

1. 调用之前要把自然语言意图转成明确的参数契约；
2. 签名之前要用模拟结果验证，而不是相信生成的 calldata；
3. 模拟成功之后仍要把资产、数量、接收方、授权和风险与原始请求逐项核对。

这与我选择的 Dev 方向一致：不仅要“让合约能调用”，还要设计调用边界、验证证据和失败策略。

## 7. 100–200 字提交分享

> Moss 解决的是 AI Agent 难以安全、统一地调用链上协议的问题。它把地址、ABI、参数规则和交易构造封装进 Protocol，通过 discover、load、action、simulate 生成并验证未签名交易，再把签名留给钱包和用户。未来可用于换币交易准备、资产查询、社区任务奖励和多协议操作助手，但模拟结果仍需人工核对意图、风险与最终签名。

## 8. 提交信息

- GitHub 用户主页：[echo5177](https://github.com/echo5177)
- GitHub Stars 页面：[echo5177 的 Stars](https://github.com/echo5177?tab=stars)
- Moss 项目：[nishuzumi/moss](https://github.com/nishuzumi/moss)
- Star 状态：等待完成 GitHub 写入授权后核验；提交前必须确认 Stars 页面可看到 Moss。

## 9. 主要资料

- [Moss README](https://github.com/nishuzumi/moss/blob/main/README.md)
- [中文 Getting Started](https://github.com/nishuzumi/moss/blob/main/docs/getting-started.zh-CN.md)
- [MCP 工具说明](https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md)
- [Agent 安全规则](https://github.com/nishuzumi/moss/blob/main/docs/agent-skill.md)
- [安全模型](https://github.com/nishuzumi/moss/blob/main/SECURITY.md)
- [贡献指南](https://github.com/nishuzumi/moss/blob/main/CONTRIBUTING.md)
