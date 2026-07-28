# Week 2｜Moss GitHub 探索日志

> 探索日期：2026-07-28（UTC+8）
>
> 目标仓库：[nishuzumi/moss](https://github.com/nishuzumi/moss)
>
> 方法：依次查看 Code、README、Docs、Issues、Pull Requests 与 Discussions；以下事实以当日公开页面和仓库文件为准。

## 1. 项目目录结构

Moss 使用 Node.js `22+`、pnpm `11` 和 TypeScript，是一个 pnpm monorepo。根目录的 `pnpm-workspace.yaml` 将 `packages/*`、`packages/protocols/*` 和 `examples/*` 纳入工作区。

```text
moss/
├─ .changeset/                 # 包版本与发布变更记录
├─ .github/                    # GitHub 协作与自动化配置
├─ docs/
│  ├─ adr/                     # Architecture Decision Records
│  ├─ getting-started.md
│  ├─ getting-started.zh-CN.md
│  ├─ mcp-tools.md
│  ├─ protocol-onboarding.md
│  └─ agent-skill.md
├─ examples/
│  ├─ agent-swap/              # Agent 与签名方分离的演示
│  └─ simple-flow/             # discover → load → action → simulate 示例
├─ packages/
│  ├─ abi-tools/               # ABI 获取与校验工具
│  ├─ core/                    # Registry、Capability tree、Receipt 校验
│  ├─ erc/                     # ERC-20 / ERC-721 / ERC-1155 能力与语义
│  ├─ mcp-server/              # MCP transport 和应用组合
│  ├─ protocols/
│  │  ├─ _template/            # 新 Protocol package 模板
│  │  ├─ kuru/                 # Kuru 协议适配
│  │  └─ pancakeswap/          # PancakeSwap 协议适配
│  ├─ simulator/               # trace、状态串联与 Changes 提取
│  └─ system/                  # Monad Runtime、官方常量、WMON 等
├─ CONTEXT.md                  # 领域词汇与统一概念
├─ CONTRIBUTING.md             # 贡献流程与 Definition of Done
├─ SECURITY.md                 # 安全保证、信任边界与限制
├─ package.json                # 根命令与工具版本
└─ pnpm-workspace.yaml         # monorepo 范围与供应链保护设置
```

这不是完整文件清单，而是我根据公开目录整理的“职责地图”。阅读顺序可以从 `README → docs/getting-started.zh-CN.md → packages/core → packages/protocols/_template → examples/simple-flow` 开始。

## 2. GitHub 各模块的作用与实际观察

| 模块 | 作用 | 本次观察 |
| --- | --- | --- |
| Code | 查看源码、目录、分支和提交历史 | `main` 是默认分支；核心代码按 monorepo package 分层 |
| README | 回答项目是什么、为什么存在、如何运行 | 明确四阶段流程、支持协议、风险提示和目录职责 |
| Docs | 给使用者和贡献者提供契约级说明 | 有中英文入门、MCP 工具、Agent 安全规则、接入指南和 ADR |
| Issues | 报告问题、提出需求、讨论设计和拆分工作 | 同时存在协议适配、文档、Core/MCP 安全边界等议题 |
| Pull Requests | 提交代码变更，展示 diff、测试证据与 review 状态 | PR 通常同时修改源码、测试、文档和 changeset |
| Discussions | 长形式问答与社区讨论 | 访问 `/discussions` 返回 404；本次观察下仓库未启用该模块 |
| Actions | 自动执行 CI / 工作流 | 用于把 lint、build、typecheck、test 等检查自动化 |
| Security | 安全策略与漏洞报告入口 | `SECURITY.md` 要求私下报告漏洞，不应公开创建漏洞 Issue |

我的理解是：README 和 Docs 解释“项目承诺什么”，Issues 记录“还缺什么或要讨论什么”，PR 则用代码、测试和 review 证明“这个改变是否真的实现了”。三者必须交叉阅读。

## 3. 我感兴趣的 Issue 与关联 PR

### Issue #90：限制 Capability tree 复杂度并拒绝循环

- Issue：[Core/MCP: bound Capability tree complexity and reject cycles](https://github.com/nishuzumi/moss/issues/90)
- 关联 PR：[fix(core): bound Capability tree complexity #91](https://github.com/nishuzumi/moss/pull/91)
- 观察状态：Issue 仍为 Open；PR #91 已关闭且未合并，因此不能把 PR 中的方案当作当前 `main` 已具备的能力。

Issue 指出，Capability tree 和 MCP `simulate` 输入如果没有深度、节点数、参数复杂度或 calldata 大小限制，恶意或畸形输入可能在失败前消耗过多栈、内存、CPU 或 RPC 资源。提案包括：

1. 用迭代式深度优先遍历代替无界递归；
2. 拒绝循环引用和共享节点；
3. 为 tree 深度、Capability 数量、参数节点、字符串和 calldata 设置累计上限；
4. 返回带稳定错误码和路径的校验错误；
5. 在 MCP 解码和模拟之前先执行 Core 校验。

我对这个 Issue 感兴趣，因为它说明 Agent 安全不只涉及“会不会转错资产”，还涉及工具输入本身是否可能造成资源耗尽。一个框架需要同时约束链上资金风险和链下执行风险。

关联 PR #91 给出了具体实现、边界测试、文档和 changeset，但最终没有合并。这个生命周期提醒我：看到 PR 的代码和测试通过说明，只能证明提交者提出过一个实现，不能证明默认分支已经采用它；必须继续检查 PR 的 merged 状态和当前 `main`。

## 4. 从贡献指南学到的开发流程

Moss 的贡献流程强调：

1. 从 `main` 创建分支，并解释动机、行为、package 边界和验证证据；
2. 先读 `AGENTS.md`、`CONTEXT.md` 和相关 ADR；
3. 面向用户的 package 变更需要 changeset；
4. 源码、测试、示例和文档要在同一变更中保持一致；
5. 依次运行 build、typecheck、lint 和 test；
6. 新 Protocol 应从 `packages/protocols/_template` 开始；
7. ABI 必须记录来源，固定地址要有权威来源和链上验证；
8. 安全漏洞使用 private vulnerability reporting，不在公开 Issue 披露。

这让我理解到，开源贡献并不等于“改完一个文件就发 PR”。可审查的贡献还需要边界说明、测试、文档、版本记录和安全判断。

## 5. 本次探索收获

1. **先画目录职责图，再读实现。** monorepo 文件很多，但通过 `core / simulator / protocol / mcp-server / examples` 的边界可以快速建立整体模型。
2. **README 是入口，不是全部。** 安全边界在 `SECURITY.md`，术语在 `CONTEXT.md`，贡献标准在 `CONTRIBUTING.md`，架构取舍在 ADR。
3. **Issue 是设计现场。** 高质量 Issue 会描述问题、威胁模型、方案、替代方案和验收标准。
4. **PR 状态是证据的一部分。** Open、Closed、Merged、Draft 的含义不同；关闭未合并的 PR 不能代表功能已经进入主分支。
5. **Agent 框架需要 fail-closed。** 模拟或证据不足时停止，比猜测成功或静默降级更安全。

## 6. 下一步

我会先运行官方 `simple-flow` 的离线测试和 wrap / swap 模拟，记录实际输出；之后再选择一个范围较小的文档或测试任务，按照贡献指南准备一次可审查的 PR，而不是直接修改核心交易逻辑。

## 7. 证据链接

- [Moss 仓库](https://github.com/nishuzumi/moss)
- [Repository layout](https://github.com/nishuzumi/moss#repository-layout)
- [Docs 索引](https://github.com/nishuzumi/moss/blob/main/docs/README.md)
- [中文 Getting Started](https://github.com/nishuzumi/moss/blob/main/docs/getting-started.zh-CN.md)
- [MCP tools](https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md)
- [CONTRIBUTING.md](https://github.com/nishuzumi/moss/blob/main/CONTRIBUTING.md)
- [SECURITY.md](https://github.com/nishuzumi/moss/blob/main/SECURITY.md)
- [Issue #90](https://github.com/nishuzumi/moss/issues/90)
- [PR #91](https://github.com/nishuzumi/moss/pull/91)
