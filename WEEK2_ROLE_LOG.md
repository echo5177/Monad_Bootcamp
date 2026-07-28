# Week 2 Role Log

> 主方向：**Dev**
>
> 当前项目方向：**Monad Community Quest**
>
> 记录时区：UTC+8

这是一份持续更新的 Week 2 学习与构建日志，用于记录资料、Prompt、证据、错误、判断变化和下一步计划。日志只写已经发生的过程；计划中的功能不会提前标记为完成。

## 本周状态

| 项目 | 状态 | 证据 |
| --- | --- | --- |
| 确定 Dev 主方向 | 已完成 | [Role Choice Card](WEEK2_ROLE_CHOICE_CARD.md) |
| 明确 Community Quest 问题与边界 | 已完成 | [问题定义](WEEK2_ROLE_CHOICE_CARD.md#2-我希望服务什么问题) |
| 建立 Week 2 Role Log | 已完成 | 本页面 |
| 设计 `CommunityQuest.sol v0.1` | 待开始 | 后续日志更新 |
| 编写和检查合约 | 待开始 | 后续代码与 Commit |
| 测试网部署与交互 | 待开始 | 后续合约地址与 Transaction Hash |
| 最小 DApp 前端 | 加分项 | 不阻塞本周最低交付 |

---

## 2026-07-28｜确定 Dev 方向并建立交付边界

### 1. 本次目标

完成 Week 2 的 Role Choice Card，明确：

- Research / Ops / Dev 中的主方向；
- 选择理由；
- 希望服务的问题；
- 本周最小产出；
- 参考资料；
- Week 3 角色。

### 2. 实际完成

1. 将 Week 1 的 Tech 方向对应到 Week 2 的 **Dev**；
2. 选择 `Smart Contract & DApp Integration` 作为细分定位；
3. 把 Week 1 的 `CheckIn` 作为 Community Quest 的链上起点；
4. 确定本周最低交付为 `CommunityQuest.sol v0.1 + README + 测试网交互证据`；
5. 把最小前端降为加分项，避免阻塞合约交付；
6. 明确 Week 3 希望承担智能合约与 DApp 集成角色；
7. 建立本 Role Log，后续持续追加实际学习和开发记录。

### 3. 资料链接

| 资料 | 本次用途 |
| --- | --- |
| [Monad Developer Guides](https://docs.monad.xyz/guides) | 核对 Monad 钱包、部署、验证、索引和连接资料 |
| [Monad Developer Essentials](https://docs.monad.xyz/developer-essentials/summary) | 了解 Monad 开发与合约部署边界 |
| [Solidity：Structure of a Contract](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html) | 确认状态变量、函数、事件和错误的基本结构 |
| [Solidity ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html) | 理解前端调用函数、解析事件所需的 ABI |
| [Viem Getting Started](https://viem.sh/docs/getting-started) | 为后续 TypeScript 合约读取与写入做准备 |
| [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation) | 为后续可选的最小 DApp 前端做准备 |
| [Week 1 Mini Demo 0](MINI_DEMO_0.md) | 复用已经部署和交互过的 `CheckIn` 经验 |

### 4. Prompt 与 AI 辅助记录

#### Prompt 摘要

本次向 AI 提出的主要要求是：

> 根据“Week 2 Role Choice Card”的任务要求，直接说明完成方式，并结合 Week 1 已完成的 CheckIn 合约帮助我做成可提交版本。

随后进一步提出：

> 建立 Week 2 Role Log，并告诉我最终需要提交什么。

#### AI 提供的帮助

- 对比 Research、Ops 和 Dev 的关注点；
- 根据 Week 1 的真实链上实践建议选择 Dev；
- 将任务要求拆解为选择理由、问题、最小产出、资料和 Week 3 角色；
- 建议把 Community Quest 合约作为最低交付，把前端作为加分项；
- 整理官方参考资料和可直接提交的 Markdown 页面；
- 建立本周持续记录结构。

#### 人工判断

- 沿用 Week 1 已经明确的 Tech 兴趣，而不是为了换任务临时选择 Research 或 Ops；
- 接受 Dev 方向，但不把“会部署一个合约”夸大成已经具备完整 DApp 开发能力；
- 将 `CommunityQuest.sol v0.1` 限定为最小合约原型；
- 不声称合约能够自动验证链下任务真实性；
- 要求 Git 提交分批完成，让作品内容与提交包装的历史清晰分开。

### 5. 截图与可验证证据

本次工作是文档型任务，没有产生新的合约界面或交易截图，因此不制造截图。当前使用公开页面和 Git Commit 作为可验证证据：

- [Week 2 Role Choice Card](WEEK2_ROLE_CHOICE_CARD.md)
- [Role Choice Card 提交稿](WEEK2_ROLE_CHOICE_SUBMISSION.md)
- [`7d00d3e`：新增 Role Choice Card](https://github.com/echo5177/Monad_Bootcamp/commit/7d00d3e)
- [`8911394`：新增平台提交稿和首页入口](https://github.com/echo5177/Monad_Bootcamp/commit/8911394)

后续开始编写和部署 `CommunityQuest.sol` 后，再加入真实的代码截图、编译结果、交易页面和状态变化证据。

### 6. 错误与修复

#### GitHub Push TLS 握手失败

第二批提交完成后，首次执行 `git push origin main` 时出现：

```text
schannel: failed to receive handshake, SSL/TLS connection failed
```

判断为 GitHub HTTPS 连接的临时 TLS 握手失败，而不是 Commit 内容或仓库权限问题。保持本地提交不变并重新执行 push 后成功，随后通过 GitHub API 确认：

- 仓库可见性为 `PUBLIC`；
- 两个 Week 2 文件都已出现在远端；
- 远端 `main` 指向第二批提交 `8911394`。

### 7. 判断变化

| 原先想法 | 当前判断 | 原因 |
| --- | --- | --- |
| Week 1 的方向叫 Tech | Week 2 对应选择 Dev | 两个名称都强调开发、合约和 DApp，本次任务使用 Dev 作为正式选项 |
| 本周应该同时做合约和完整前端 | 最低交付先完成合约、README 和链上证据 | 前端会扩大范围，不应阻塞最小可验证产出 |
| 防止重复领取就等于验证任务完成 | 两者是不同问题 | 合约能阻止同一地址重复领取，但不能自动知道链下行为是否真实发生 |
| Role Choice Card 和 Role Log 可能重复 | 两者应独立存在 | Card 是静态选择，Log 是持续记录真实过程和变化 |

### 8. 下一步计划

1. 写出 `CommunityQuest.sol v0.1` 的函数和状态变量清单；
2. 决定任务是部署时预设，还是由管理员创建；
3. 编写最小合约和人工审查清单；
4. 验证正常完成任务、重复领取回退和积分读取；
5. 部署到 Monad 测试环境并保存合约地址和交易 Hash；
6. 将实际 Prompt、错误、截图或 Explorer 链接追加到本日志；
7. 合约最低交付完成后，再决定是否制作 Next.js + Viem 前端。

### 9. 当前未解决的问题

> 如果任务发生在链下，应该使用管理员确认、服务器签名、其他链上行为，还是另一种方式证明用户真实完成了任务？

这个问题不会在 `v0.1` 中被假装解决，但会影响后续版本的数据结构和权限设计。

---

## 后续日志模板

> 下面是新增学习或开发活动时使用的模板，不代表这些内容已经完成。

```markdown
## YYYY-MM-DD｜本次主题

### 1. 本次目标

### 2. 实际完成

### 3. 资料链接

### 4. Prompt 与 AI 辅助记录

### 5. 截图与可验证证据

### 6. 错误与修复

### 7. 判断变化

### 8. 下一步计划

### 9. 当前未解决的问题
```

## 安全边界

本日志不会记录或上传私钥、助记词、钱包密码、API Key、`.env`、未公开会议链接或完整私人聊天记录。Prompt 只保留与学习过程有关的摘要。
