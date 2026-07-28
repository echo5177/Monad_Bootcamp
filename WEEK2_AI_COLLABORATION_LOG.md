# Week 2 AI Collaboration Log

> 协作案例：从 Week 1 `CheckIn` 链上实践整理到 Week 2 Dev 方向与 Community Quest 最小范围
>
> 记录日期：2026-07-26 至 2026-07-28
>
> 原则：AI 提供分析、草稿和检查辅助；人类保留事实核查、选择、授权和责任。

## 1. 协作目标与输入

这次协作需要完成：

1. 将 Week 1 的真实钱包、合约部署和交互记录整理成公开作品；
2. 在 Research / Ops / Dev 中选择 Week 2 主方向；
3. 定义 Community Quest 的问题、最低交付和 Week 3 角色；
4. 建立可持续更新的 Role Log；
5. 初始化并维护 public GitHub 仓库，同时排除私人聊天和敏感信息。

提供给 AI 的有效输入包括：

- 训练营任务原文；
- Week 1 的本地聊天记录；
- 真实课程钱包地址；
- `CheckIn` 合约地址；
- 部署和 `checkIn()` 交易 Hash；
- 已经明确的 Tech 兴趣；
- public 仓库、分批 Commit 和忽略聊天记录的要求。

AI 没有获得私钥、助记词、钱包密码或 API Key。

## 2. Prompt 摘要

为避免公开完整私人聊天，只保留与任务相关的 Prompt 摘要。

### Prompt A：整理 Week 1 Build Log

> 根据聊天记录中的实际步骤，完成 Week 1 Build Log 和方向选择；初始化 public GitHub 仓库，不要提交聊天记录。

### Prompt B：制作 Mini Demo 0

> 把已经部署的 CheckIn 合约整理为可直接提交的 Mini Demo 0，说明真实链上部分、AI 辅助、人工判断和后续方向。

### Prompt C：确定 Week 2 方向

> 根据 Role Choice Card 的要求，选择 Research / Ops / Dev 主方向，并完成选择理由、服务问题、本周最小产出、参考资料和 Week 3 角色。

### Prompt D：建立持续日志

> 建立 Week 2 Role Log，记录资料、Prompt、截图或证据、错误、判断变化和下一步计划。

### 额外约束

> Git 修改需要分批 Commit、分批 Push；聊天记录必须保持忽略。

## 3. AI 帮助了什么

| 环节 | AI 提供的帮助 | 实际输出 |
| --- | --- | --- |
| 信息整理 | 从长聊天记录中提取钱包、合约、交易、问题和学习变化 | [Week 1 Build Log](README.md) |
| 合约解释 | 解释 Read / Write、ABI、Gas、合约地址和 Transaction Hash | [Mini Demo 0](MINI_DEMO_0.md) |
| 方向分析 | 对比 Research、Ops、Dev，并把原 Tech 兴趣映射到 Dev | [Role Choice Card](WEEK2_ROLE_CHOICE_CARD.md) |
| 范围拆分 | 将 Community Quest 拆成任务 ID、积分、防重复领取、事件和读取接口 | [Week 2 最小产出](WEEK2_ROLE_CHOICE_CARD.md#3-week-2-最小产出) |
| 文档草拟 | 生成公开页面、提交稿、检查表和 Role Log 结构 | [Week 2 Role Log](WEEK2_ROLE_LOG.md) |
| 资料核对 | 查找 Monad、Solidity、Viem 和 Next.js 官方文档 | [参考资料](WEEK2_ROLE_CHOICE_CARD.md#5-参考资料) |
| Git 协作 | 按范围暂存文件、分批 Commit 和 Push，并检查远端公开页面 | [GitHub Commit 历史](https://github.com/echo5177/Monad_Bootcamp/commits/main/) |
| 安全检查 | 扫描常见密钥格式、裸 IP、会议凭证和未配对 Markdown 围栏 | 仓库公开文件与本地检查结果 |

## 4. 人类删改、核查和决定了什么

### 4.1 真实链上事实

人类实际完成钱包连接、MetaMask 签名、合约部署和 `checkIn()` 调用，并提供真实链上数据。AI 只能整理这些数据，不能替代钱包签名或凭空证明交易发生。

人工保留并核对的 Proof of Work：

- [CheckIn 合约](https://testnet.monadvision.com/address/0xB71E1A8Fe59F6B104B7C05a94Bfbc755e34BE818)
- [部署交易](https://testnet.monadvision.com/tx/0xcab88b72ab3eecb7cc876c00bb20ed3ed4dbf7b0443a33e81082e69df9ee9ee6)
- [`checkIn()` 交互交易](https://testnet.monadvision.com/tx/0x9d3a1ce660521cac3e2e7868a4fd03e2896b1c39d7cf2bdb325695417adea7e3)

### 4.2 删除或降级不充分的内容

以下内容没有被当作已完成事实提交：

- 没有独立 Hash 的早期普通转账；
- 尚未开发的 Community Quest 合约；
- 尚未制作的 DApp 前端；
- 没有真实来源的截图；
- “合约可以自动证明链下任务真实完成”的过度结论。

### 4.3 修改范围

最初可以把合约、完整前端、排行榜和链下验证都写进 Week 2 计划，但人工判断后将范围调整为：

> 最低交付是 `CommunityQuest.sol v0.1 + README + 测试网交互证据`；前端是加分项。

这样既保留 Dev 方向，也避免把一周计划写成不可验证的大而全项目。

### 4.4 人工选择与授权

- 人类最终接受 **Dev** 作为主方向；
- 人类要求把 Git 历史拆成清晰的分批 Commit；
- 人类明确授权创建 public 仓库和 Push；
- 人类决定私人聊天记录不得提交；
- 人类负责判断提交内容是否代表自己的真实经历和学习结果。

## 5. 哪些事情不能交给 AI

| 不能完全交给 AI 的事项 | 原因 |
| --- | --- |
| 私钥、助记词和钱包密码管理 | AI 不应接触或保存控制资产的秘密 |
| 钱包签名和交易确认 | 必须由钱包持有人核对网络、账户、函数和费用后授权 |
| 真实交易和部署结果核查 | AI 草稿中的地址或 Hash 可能错误，必须用钱包或 Explorer 验证 |
| 最终职业与团队角色选择 | AI 可以比较选项，但不能代替个人兴趣、能力和承诺 |
| 产品是否值得上链 | 需要结合真实用户、成本、公平性和业务目标判断 |
| 链下任务真实性 | 合约和 AI 都不能仅凭用户调用函数证明现实行为已经发生 |
| 生产级安全审计 | AI 审查只能作为辅助，不能替代测试、专业审计和责任人确认 |
| 对外声明与提交 | 人类必须确认文字没有夸大能力、进度或 Proof of Work |

## 6. 一次实际修改示例

### AI 初步方向

把 `CheckIn` 直接扩展为包含合约、网页、积分和排行榜的 Community Quest DApp。

### 人工核查发现

- 当前只完成了 Remix 手动交互；
- 排行榜需要事件和链下索引；
- 链下任务真实性没有验证机制；
- 同时开发完整前端会扩大本周范围。

### 最终修改

- 合约原型成为最低交付；
- 前端成为加分项；
- 排行榜改为后续通过事件或 Indexer 计算；
- 明确 `v0.1` 只能证明调用和防重复，不能证明链下行为；
- 未完成内容在文档中统一标为“计划”或“待开始”。

## 7. 协作结果

这次协作证明了 AI 最适合承担：

- 信息压缩；
- 方案比较；
- 初稿生成；
- 结构化检查；
- 重复性 Git 和文档工作。

人类仍然负责：

- 提供真实证据；
- 删除不可靠内容；
- 核对链上事实；
- 控制秘密和签名；
- 决定范围与方向；
- 对最终提交负责。

一句话总结：

> AI 提高了整理、解释和交付效率，但真实性、选择、安全和责任仍然必须由人类掌握。

## 8. 安全边界

本记录只保留与任务有关的 Prompt 摘要，不公开完整私人聊天，也不包含私钥、助记词、钱包密码、API Key、`.env` 或未公开会议链接。
