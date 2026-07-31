# Prism Forge / 棱镜工坊：Week 3 Team Hub

我们围绕同一个问题协作：怎样让第一次接触 Pyth 的 Monad 学习者，不连接钱包也能读懂一条真实链上价格。

项目名称：**Monad Price Lens**  
主方向：**Dev**，Research、Ops、Product & UX 提供验证  
工作方式：Violet 负责最终判断，三个固定 AI Builder 提供独立角色视角。公开材料会明确这个边界，不把 AI 成员写成真人同学。

## 固定成员

| 成员 | 角色 | 固定形象 | 本周责任 | 可检查产出 |
| --- | --- | --- | --- | --- |
| Violet | Dev Builder / Owner | [紫色六角恐龙，抱着终端窗口](docs/avatars/violet.svg) | 实现链上查询、解码、页面与发布；做最终取舍 | 可运行 Demo、源码、验证记录 |
| 岚舟 / Lan Zhou | Research Builder | [靛蓝猫头鹰，握着银色指南针](docs/avatars/lan-zhou.svg) | 核对 Pyth 字段、合约来源、新鲜度边界 | 问题证据、来源与研究结论 |
| 橙子 / Cheng Zi | Ops Builder | [橙色狐狸，拿着便携扩音器](docs/avatars/cheng-zi.svg) | 设计招募、测试任务、演示和协作规则 | 测试脚本、反馈框架、Demo 讲稿 |
| 墨尺 / Mo Chi | Product & UX Builder | [青绿色机械猫，拿着折叠尺](docs/avatars/mo-chi.svg) | 收敛 MVP、信息架构与体验验收 | 产品卡、用户流程、可用性清单 |

当前缺口：三名真实同学的体验反馈，以及熟悉 Oracle 风险的人工 reviewer。AI 测试只作为预检，不能冒充真人验证。

## 协作规则

1. 看板使用 `Backlog → Ready → Doing → Review → Done`，每个成员同时只保留一个 Doing 项。
2. 每个任务必须有负责人、验收标准和证据链接。没有代码、截图、测试记录或公开文档，就不算完成。
3. 重要决定使用“问题、选项、决定、理由、负责人、验证结果”格式，旧决定不被静默改写。
4. 每日异步更新一次；Demo 前做 15 分钟同步；反馈收集后做 20 分钟归纳。
5. Violet 对安全、链上事实和发布范围拥有最终决定权。分歧先看证据，再做最小可逆选择。

## 安全边界

- Demo 只读，不连接钱包、不签名、不发送交易。
- 只允许预先核对的 Pyth 合约与 Feed ID。
- 仓库不出现私钥、助记词、API Key、`.env`、私有 RPC、测试者身份或未公开会议链接。
- 页面必须显示数据来源、发布时间和失败状态，不能用缓存或截图冒充实时查询。
- Fresh 只表示满足时间阈值，不代表价格准确、无风险或适合交易。

## Week 3 看板

| 状态 | 任务 | Owner | 验收证据 |
| --- | --- | --- | --- |
| Done | 问题与用户范围 | 墨尺 | [Problem & Mini Demo Card](WEEK3_03_PROBLEM_DEMO_CARD.md) |
| Done | Pyth 字段与来源核对 | 岚舟 | [Dev Validation](WEEK3_04_DEV_VALIDATION.md) |
| Done | 协作与测试流程 | 橙子 | [Team Plan](WEEK3_06_TEAM_PLAN.md) |
| Done | Monad Price Lens V1 | Violet | 页面、源码、V1 截图 |
| Done | 三视角体验预检 | 外部测试 Agents | [匿名 AI 反馈记录](WEEK3_08_PRODUCT_FEEDBACK.md) |
| Done | 根据反馈改进 V2 | Violet + 墨尺 | [前后对比、V2 截图](WEEK3_09_FEEDBACK_ITERATION.md) |
| Done | 体验另一团队作品 | Violet | [作品链接、截图、体验结论](WEEK3_10_OTHER_PRODUCT_EXPERIENCE.md) |
| Done | Mini Demo 与复盘 | 全队 | [作品页](WEEK3_11_MINI_DEMO.md)、[Week 4 决定](WEEK3_12_HACKATHON_RETRO.md) |
| Ready | 三名真人同学体验 | 橙子 + Violet | [公开 Feedback Issue](https://github.com/echo5177/Monad_Bootcamp/issues/1) 的三条真实回复 |

沟通载体是当前 Codex 团队任务，公开协作记录和看板以本文件为准。
