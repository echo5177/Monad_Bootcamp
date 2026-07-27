# Week 1 Mini Demo 0 提交稿

下面内容已经按照任务要求整理，可直接提交到任务平台。

## 分字段填写

### 1. Week 1 作品链接

https://github.com/echo5177/Monad_Bootcamp

### 2. Demo README / 公开说明文档

https://github.com/echo5177/Monad_Bootcamp/blob/main/MINI_DEMO_0.md

本次选择任务允许的“README / 公开说明文档”形式，不额外提交录屏。说明文档已经包含作品流程、真实链上证据、AI 辅助、人工判断、当前限制和后续方向。

### 3. 方向选择

**Tech**

我已经完成 Solidity 合约检查、Monad Testnet 部署、Read / Write 调用和 Explorer 验证。相比只分析或传播产品，我更希望继续学习如何把合约做成用户可以实际操作的 DApp，因此选择 Tech。

### 4. 作品集或简历描述

> 在 Monad Testnet 上完成 Solidity 打卡合约的代码检查、部署及 Read / Write 交互，通过区块浏览器验证链上交易，并规划其向社区任务积分 DApp 的演化路径。

### 5. Week 2 继续推进的问题

> 如果 Community Quest 的任务发生在链下，应该如何证明用户真实完成了任务，同时避免用户直接调用合约函数刷分？

后续还希望确认：

- `Next.js + Viem` 是否适合作为新手构建最小 DApp 的技术栈；
- 排行榜应在合约内维护，还是通过事件和 Indexer 在链下计算。

## 一次性提交版本

如果任务平台只有一个输入框，可以直接提交下面这段：

---

**作品名称：** Monad CheckIn Mini Demo 0

**Week 1 作品链接：** https://github.com/echo5177/Monad_Bootcamp

**Demo 公开说明文档：** https://github.com/echo5177/Monad_Bootcamp/blob/main/MINI_DEMO_0.md

**作品说明：**

这是一个部署在 Monad Testnet 上的最小链上打卡合约。每个钱包可以使用 `getMyCheckIns()` 读取自己的打卡次数，并通过 `checkIn()` 发起真实链上交易，将个人和全局打卡次数各增加一次。我使用 Remix 编译合约，通过 MetaMask 签署部署和交互交易，并在 MonadVision 中核对合约地址、Transaction Hash、区块和成功状态。

**真实链上部分：**

合约部署、`checkIn()` 写入交易、状态读取和 Explorer 验证均已实际完成，相关合约地址和交易链接已整理在作品说明文档中。

**AI 辅助部分：**

AI 帮助生成并解释最小合约初稿，说明钱包、Gas、ABI、Read / Write 的区别，提供 Remix 部署步骤，并协助整理 README 和后续产品方向。

**人工判断与修改：**

我人工核对了测试网络和课程钱包，检查合约的状态变化、权限和复杂度，在 Explorer 中验证真实交易，并判断无限打卡只适合最小 Demo；真实产品需要限频、防刷和任务完成证明。我也判断并非所有数据都需要上链，只有需要公开验证和可信共享的结果适合上链。

**方向选择：** Tech

我选择 Tech，因为我希望继续学习如何把 Solidity 合约变成用户可以实际操作的 DApp。下一步计划将 CheckIn 演化为 Monad Community Quest，增加任务 ID、积分、防重复领取、事件、钱包连接和排行榜数据展示。

**作品集 / 简历描述：**

在 Monad Testnet 上完成 Solidity 打卡合约的代码检查、部署及 Read / Write 交互，通过区块浏览器验证链上交易，并规划其向社区任务积分 DApp 的演化路径。

**Week 2 希望继续解决的问题：**

如果 Community Quest 的任务发生在链下，应该如何证明用户真实完成了任务，同时避免用户直接调用合约函数刷分？

---

## 提交前核对

- [x] Week 1 公开作品链接
- [x] Demo README / 公开说明文档
- [x] 真实链上操作与交易证据
- [x] AI 辅助与人工判断
- [x] Week 2 方向：Tech
- [x] 作品集 / 简历一句话
- [x] Week 2 继续推进的问题
- [x] 不包含私钥、助记词、API Key、`.env`、未公开会议链接或聊天记录
