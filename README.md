# Monad CheckIn — Week 1 Mini Demo 0 & Build Log

这是我在 Monad Builder Camp Week 1 完成的最小链上作品与学习记录。核心成果是将 `CheckIn` 合约部署到 Monad Testnet，完成 Read / Write 交互并用区块浏览器验证真实链上结果；我据此选择 Week 2 的 **Tech** 方向。

| 快速入口 | 内容 |
| --- | --- |
| [Mini Demo 0 作品页](MINI_DEMO_0.md) | 面向评审的演示说明、链上证据、AI/人工边界与后续方向 |
| [可直接提交文本](SUBMISSION.md) | 按任务的五项提交要求整理，可直接粘贴到任务平台 |
| [CheckIn 合约](contracts/CheckIn.sol) | 本次部署和交互使用的 Solidity 源码 |

以下是完整的 Week 1 Build Log。

## 1. Week 1 概览

我完成了以下实践：

1. 使用课程专用钱包连接 Monad Testnet。
2. 使用 Solidity `0.8.24` 编写并检查最小打卡合约 `CheckIn`。
3. 在 Remix 中完成编译，通过 MetaMask 签署部署交易。
4. 调用 `getMyCheckIns()` 读取状态。
5. 调用 `checkIn()` 修改状态，并再次读取结果。
6. 在区块浏览器中核对合约地址、交易状态和区块信息。
7. 分析高频社区任务场景为什么可能适合 Monad，并规划 `Monad Community Quest` 的 Tech 功能清单。

早期的钱包配置、领取测试币和普通测试网转账已在学习过程中完成，但当前聊天记录没有保存那笔普通转账的独立 Hash。因此本仓库只列出能够从现有记录准确还原的合约部署与交互证据，不补造缺失信息。

## 2. 链上实践与 Proof of Work

### 2.1 合约信息

| 项目 | 记录 |
| --- | --- |
| 合约 | [`CheckIn.sol`](contracts/CheckIn.sol) |
| 网络 | Monad Testnet |
| 部署时记录的 Chain ID | `10143` |
| 开发工具 | Remix IDE、MetaMask |
| Solidity | `0.8.24` |
| 课程钱包 | [`0x78d85df608B9d7cf2f8b87A80e2aE70629CAaAB3`](https://testnet.monadvision.com/address/0x78d85df608B9d7cf2f8b87A80e2aE70629CAaAB3) |
| 合约地址 | [`0xB71E1A8Fe59F6B104B7C05a94Bfbc755e34BE818`](https://testnet.monadvision.com/address/0xB71E1A8Fe59F6B104B7C05a94Bfbc755e34BE818) |

### 2.2 部署交易

| 项目 | 记录 |
| --- | --- |
| 状态 | Success |
| Transaction Hash | [`0xcab88b72ab3eecb7cc876c00bb20ed3ed4dbf7b0443a33e81082e69df9ee9ee6`](https://testnet.monadvision.com/tx/0xcab88b72ab3eecb7cc876c00bb20ed3ed4dbf7b0443a33e81082e69df9ee9ee6) |
| Block | [`45132741`](https://testnet.monadvision.com/block/45132741) |
| From | `0x78d85df608B9d7cf2f8b87A80e2aE70629CAaAB3` |
| Gas | `253895` |

### 2.3 Read / Write 交互

- Read：通过 `getMyCheckIns()` 读取当前钱包的打卡次数。Read 不修改链上状态，因此不产生 Transaction Hash。
- Write：调用 `checkIn()`，个人打卡次数和全局打卡次数各增加 `1`，并发出 `CheckedIn` 事件。
- 状态验证路径：初次读取 `0` → 执行 `checkIn()` → 再次读取 `1`。

| 项目 | 记录 |
| --- | --- |
| 状态 | Success |
| Function | `checkIn()` |
| Transaction Hash | [`0x9d3a1ce660521cac3e2e7868a4fd03e2896b1c39d7cf2bdb325695417adea7e3`](https://testnet.monadvision.com/tx/0x9d3a1ce660521cac3e2e7868a4fd03e2896b1c39d7cf2bdb325695417adea7e3) |
| Block | [`45134467`](https://testnet.monadvision.com/block/45134467) |
| To | `0xB71E1A8Fe59F6B104B7C05a94Bfbc755e34BE818` |
| Gas | `80996` |

这条实践链路可以概括为：

```text
Solidity 源码
→ 编译得到 Bytecode 和 ABI
→ 钱包签署部署交易
→ 获得合约地址
→ Read 读取状态
→ Write 修改状态
→ Explorer 验证结果
```

## 3. AI 协作与人工判断

我给 AI 的核心需求可以压缩为：

> 生成一个使用 Solidity 0.8.24 的最小打卡合约；每个钱包可调用 `checkIn()`，记录个人与全局次数；包含 Read、Write 和事件；避免不必要的复杂逻辑。

AI 生成了包含 `mapping`、`totalCheckIns`、`checkIn()`、`getMyCheckIns()` 和 `CheckedIn` 事件的初稿，并解释了编译、部署、交互及证据整理步骤。

| 环节 | AI 的帮助 | 我的人工判断与修改 |
| --- | --- | --- |
| 概念理解 | 用类比解释钱包、Gas、ABI、合约和交易 | 判断自己是否真正理解，而不是只记操作按钮 |
| 合约初稿 | 生成最小 Solidity 结构 | 检查编译版本、状态变化、权限和复杂度 |
| 部署流程 | 给出 Remix 与 MetaMask 操作步骤 | 核对网络、课程钱包、交易费用和签名内容 |
| 链上证据 | 提供 README 与记录模板 | 用 Explorer 核对地址、Hash、区块和成功状态 |
| 产品方向 | 提出 Community Quest 功能规划 | 判断哪些数据值得上链，以及当前任务的合理范围 |

人工检查的关键结论：

1. `getMyCheckIns()` 是 `view` 函数，不修改状态。
2. `checkIn()` 同时更新个人次数和总次数。
3. 合约没有转账、提款和外部合约调用，适合作为低复杂度练习。
4. 任何地址都能无限打卡对本 Demo 可以接受，但真实产品需要限频、防刷或任务完成证明。
5. AI 可以生成方案和解释过程，但不能代替我验证链上事实，也不能替我决定产品是否合理。

## 4. 遇到的问题与修复过程

### 问题一：完成部署，却不知道现实中有什么用

最初我只是照步骤点击 Remix 和 MetaMask。重新梳理后，我把合约理解为“公开可验证的链上后端”：钱包负责身份与签名，合约保存共享状态，合约地址是程序入口，Transaction Hash 是某次操作的凭证。最小合约的价值在于走通完整链路，而不是打卡功能本身有多复杂。

### 问题二：只能把 Monad 概括为“更快”

我改为从用户过程判断：社区任务、积分和排行榜需要频繁更新；如果每次操作都等待很久或成本过高，连续体验会被破坏。与此同时，动画、聊天和临时页面数据不必上链；任务结果、积分、奖励领取和需要公开验证的排名才可能值得上链。

### 问题三：误以为 `CheckIn` 变成任务系统只是改变量名

`checkInCount → playerScore` 和 `checkIn() → completeQuest()` 表示复用“钱包地址 → 用户数据”的基础结构，而不是简单重命名。真正的任务系统还需要任务 ID、奖励规则、防止重复领取、事件，以及对链下任务完成情况的验证。

### 问题四：不确定是否要立即开发完整应用

重新核对任务边界后，我确认当时的交付是 Tech 功能规划，不是完整 DApp。这个判断避免了在需求和验证机制尚未明确时过早扩大开发范围。

## 5. 对 Monad 与 Web3 理解的变化

- 钱包的核心不是“存币”，而是管理密钥并为操作签名。
- 智能合约只有经过编译、部署并产生真实交互后，才成为链上运行的程序。
- Contract Address 指向程序，Transaction Hash 指向一次具体操作，两者不能混淆。
- 区块链不是普通数据库的替代品。只有涉及公开验证、共同状态、公平性或数字资产所有权的数据，才有充分的上链理由。
- Monad 的 EVM 兼容性意味着 Solidity、钱包和常见以太坊工具能够继续使用；性能价值应落到具体产品体验，而不是停留在口号。

## 6. 本周最重要的三个收获

1. **走通完整链路**：源码、编译、钱包签名、部署、合约地址、Read / Write 与 Explorer 验证缺一不可。
2. **分清 Read 和 Write**：Read 通常不产生交易；Write 修改公共状态，需要签名、Gas 和 Transaction Hash。
3. **先判断是否需要上链**：不是交互越多越好，关键是哪些结果需要公开验证和可信共享。

## 7. Week 2 方向选择：Tech

我初步选择 **Tech**。

Week 1 中，我完成了钱包连接、Solidity 合约检查、Monad Testnet 部署、Read / Write 调用和 Explorer 验证。相比只分析或传播产品，我更想继续理解“合约如何变成真正可使用的应用”。目前我仍主要通过 Remix 手动交互，尚未完成前端连接钱包、交易状态展示、事件读取和排行榜数据处理，这些正是我希望补齐的能力。

Week 2 的初步目标是把 `CheckIn` 的基础结构演化为 **Monad Community Quest**：

1. 使用任务 ID 和奖励规则替代简单打卡。
2. 防止同一钱包重复领取同一任务积分。
3. 发出任务完成事件，保留可索引的链上证据。
4. 创建最小网页，连接钱包并调用合约。
5. 读取个人积分，并探索由事件或 Indexer 计算排行榜。
6. 明确链下任务的完成证明机制，避免用户自行调用函数刷分。

## 8. 希望助教或同伴帮助的问题

1. 如果任务发生在链下，最小 Demo 应使用管理员确认、服务器签名，还是其他方式证明用户真实完成了任务？
2. 新手把 Solidity 合约做成可用网页时，`Next.js + Viem` 是否是合适的最小技术栈？
3. 排行榜应完全在合约中实现，还是通过事件和 Indexer 在链下计算？最小 Demo 应如何取舍？

## 9. 资料与安全边界

- [Monad 官方文档](https://docs.monad.xyz/)
- [Monad Builder Camp 公开仓库](https://github.com/IntensiveCoLearning/monad-builder-camp)
- [本项目合约源码](contracts/CheckIn.sol)

本仓库只包含公开链上地址、交易证据、合约源码和学习总结，不包含私钥、助记词、钱包密码、API Key、`.env`、未公开会议链接或聊天记录。
