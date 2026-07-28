# Week 2 Role Choice Card

## 角色卡

| 项目 | 我的选择 |
| --- | --- |
| 主方向 | **Dev** |
| 细分定位 | Smart Contract & DApp Integration |
| 希望服务的问题 | 让社区任务、积分和领取记录可以被公开验证，并减少同一钱包重复领取的问题 |
| Week 2 最小产出 | 一个可部署的 `CommunityQuest.sol v0.1`、README 和一组测试网交互证据 |
| Week 3 角色 | Community Quest 的智能合约与 DApp 集成负责人 |

## 1. 为什么选择 Dev

我选择 **Dev**，因为 Week 1 已经完成了以下真实实践：

- 使用课程专用钱包连接 Monad Testnet；
- 编写并检查 Solidity `CheckIn` 合约；
- 使用 Remix 编译并部署合约；
- 调用 Read / Write 函数；
- 在区块浏览器中验证合约地址和交易结果。

这些经历让我确认，相比只研究或传播一个产品，我更想解决“如何把链上规则变成用户能够实际操作的功能”。

我目前的能力边界也比较明确：已经理解并走通合约部署和手动交互，但还没有系统完成合约测试、前端钱包连接、交易状态反馈、事件读取和链上数据展示。Dev 方向正好能让我在已有基础上继续构建，而不是重新从零选择一条无关路线。

Week 1 证据：

- [Monad CheckIn Mini Demo 0](MINI_DEMO_0.md)
- [CheckIn 合约源码](contracts/CheckIn.sol)
- [Week 1 Build Log](README.md)

## 2. 我希望服务什么问题

### 目标场景

我希望继续推进 **Monad Community Quest**：社区成员使用钱包完成任务、获得积分，并查看可以公开验证的任务记录。

### 当前问题

普通社区任务常依赖表格、截图或人工登记，可能出现：

1. 完成记录分散，参与者难以自行核对；
2. 积分和奖励规则不透明；
3. 同一用户可能重复领取同一任务奖励；
4. 项目方与参与者缺少共同可验证的记录。

### Dev 方向可以提供的价值

通过智能合约，可以把任务编号、奖励分数、钱包完成状态和积分变化保存为公开链上状态，并使用事件为后续排行榜或数据索引提供证据。

我的问题定义是：

> 如何用一个足够小的智能合约，让社区任务的完成记录、积分和重复领取检查具备公开可验证性，同时为后续 DApp 前端保留清晰接口？

### 明确边界

`CommunityQuest.sol v0.1` 只能证明：

- 某个钱包调用了某项任务的完成函数；
- 该钱包以前没有领取过这项任务；
- 合约按照预设规则增加了积分。

它不能自动证明用户真的完成了链下行为，例如参加活动、发布内容或赢得一局游戏。链下任务真实性需要管理员确认、服务器签名、链上行为证明或其他验证机制。这是后续需要解决的问题，不会在本周最小版本中被夸大为“已经解决”。

## 3. Week 2 最小产出

本周计划交付：

> 一个可编译、可部署、可交互的 `CommunityQuest.sol v0.1`，配套 README，并保留至少一次成功完成任务和一次重复领取失败的测试网证据。

### 合约最小功能

1. 使用任务 ID 区分不同任务；
2. 为每个任务设置固定积分；
3. 使用 `completeQuest(questId)` 完成任务；
4. 使用映射记录钱包是否已经完成某项任务；
5. 阻止同一钱包重复领取同一任务积分；
6. 使用 `getMyScore()` 读取个人积分；
7. 发出 `QuestCompleted` 事件；
8. 记录全部任务完成次数。

### 验收标准

- [ ] Solidity 合约编译成功；
- [ ] 合约部署到 Monad 测试环境；
- [ ] 第一次调用 `completeQuest(1)` 成功；
- [ ] 再次调用同一任务时交易回退；
- [ ] `getMyScore()` 返回更新后的积分；
- [ ] Explorer 中可以查看部署和交互记录；
- [ ] README 说明功能、部署步骤、交互方法、限制和链上证据；
- [ ] 不提交私钥、助记词、API Key、`.env` 或未公开链接。

### 加分项，不属于最低交付

如果合约进度顺利，再制作一个最小网页：

- 连接钱包；
- 显示当前地址；
- 读取个人积分；
- 点击按钮调用 `completeQuest()`；
- 显示等待签名、交易广播、成功或失败状态。

前端是加分项，不会阻塞本周最小合约交付。

## 4. Week 3 角色

Week 3 我希望担任：

> **Community Quest 的智能合约与 DApp 集成负责人**

主要职责：

1. 维护任务、积分、防重复领取和事件的数据结构；
2. 保证合约接口便于前端调用；
3. 部署合约并整理 ABI、地址和交易证据；
4. 使用 Viem 将钱包、Read / Write 调用和交易状态接入前端；
5. 与 Research 角色确认问题是否值得上链；
6. 与 Ops 角色确认用户流程、任务规则和反馈方式。

这个角色不意味着独自决定所有产品和运营问题，而是负责把已经确认的规则实现成可以测试和验证的技术功能。

## 5. 参考资料

| 资料 | 用途 |
| --- | --- |
| [Monad Developer Guides](https://docs.monad.xyz/guides) | Monad 钱包、合约部署、验证、索引和连接方式 |
| [Monad Developer Essentials](https://docs.monad.xyz/developer-essentials/summary) | Monad 开发与部署需要注意的网络和合约信息 |
| [Solidity：Structure of a Contract](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html) | 状态变量、函数、事件和错误的官方说明 |
| [Solidity ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html) | 理解前端如何根据 ABI 调用函数和解析事件 |
| [Viem Getting Started](https://viem.sh/docs/getting-started) | 使用 TypeScript 读取链上数据并调用合约 |
| [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation) | 后续最小 DApp 前端的项目基础 |
| [Monad CheckIn Mini Demo 0](MINI_DEMO_0.md) | 我在 Week 1 已完成的真实链上起点 |

## 6. 一句话总结

> 我选择 Dev，计划把 Week 1 的 CheckIn 合约扩展为可验证任务完成、积分和防重复领取的 Community Quest 最小合约，并在 Week 3 负责智能合约与 DApp 集成。
