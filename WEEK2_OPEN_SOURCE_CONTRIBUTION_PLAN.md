# Week 2｜开源贡献计划：为 Moss 新增 Pyth Monad Oracle Adapter

> 制订日期：2026-07-29（UTC+8）  
> Builder：[echo5177](https://github.com/echo5177)  
> 目标项目：[nishuzumi/moss](https://github.com/nishuzumi/moss)  
> 实际 PR：[feat(pyth): add freshness-checked Monad oracle adapter #146](https://github.com/nishuzumi/moss/pull/146)

## 1. Builder 身份

我是选择 Dev 方向的 Web3 初学者。Week 1 我完成了一个 `CheckIn` 合约的编写、部署、Read / Write 交互和 Explorer 验证；Week 2 我希望从“完成自己的 Demo”进一步走到“理解并遵守一个真实开源项目的协作规则”。

我的当前能力边界是：

- 能阅读 TypeScript、Solidity、ABI、测试和基础 Git diff；
- 能使用 Git 分支、commit、push 和 Pull Request；
- 能运行构建、类型检查、单元测试和只读链上测试；
- 仍需要通过 review 学习 package 边界、API 设计和维护者对贡献范围的判断。

## 2. 贡献方向与要解决的问题

我的主方向是 **Dev / Protocol Adapter**，具体选题是为 Moss 增加一个只读的 **Pyth Monad Oracle Adapter**。

要解决的问题是：Agent 如果要读取价格，不能自行猜测合约地址、Feed ID 或直接使用没有新鲜度判断的价格接口。贡献应把这些容易出错的知识放进可审查的 Protocol package：

1. 使用 Monad 官方注册表中的 Pyth PriceFeed 地址；
2. 只接受官方列出的 60 个 Feed 名称，不允许调用者传入任意地址或 Feed ID；
3. 使用 `getPriceNoOlderThan`，让调用者明确价格最多可以旧多少秒；
4. 把 `bigint` 转成 JSON-safe 字符串，便于 MCP / Agent 使用；
5. 记录 ABI、部署地址和 Feed ID 的可复现来源；
6. 用离线测试和 Monad mainnet 只读测试验证实现。

这个选题不会签名、发送交易或接触用户资金，适合作为第一次 Protocol Adapter 贡献。

## 3. 本周最小目标

本周最小目标不是“让 PR 必须被合并”，因为合并权属于维护者；目标是交付一份达到 review 条件、证据完整、可以独立讨论的真实 PR。

| 目标 | 验收方式 |
| --- | --- |
| 增加 `oracle` Protocol Category | Core 类型定义、文档和正反类型 fixture 一致 |
| 新增 `@themoss/protocol-pyth` | 能被 Registry `discover`、`load` 和 `action` |
| 约束 Feed 与新鲜度 | 只接受 60 个官方 Feed；无效 Feed 和范围在 RPC 前被拒绝 |
| 固定可验证来源 | 完整 IPyth ABI、Monad 部署注册表、版本、commit 和哈希均有记录 |
| 提供离线测试 | 参数、输出、错误传播、类型和生成结果都有测试 |
| 提供真实链上验证 | 检查 Monad chain ID、合约 bytecode 和新鲜的 `MON_USD` 价格 |
| 接入默认 MCP 组合 | MCP 能按 `oracle` 分类发现并加载 `pyth.price` |
| 提交公开 PR | PR 描述清楚问题、边界、测试和来源，允许维护者修改分支 |

## 4. 预期产出

1. 一个公开的 Moss Pull Request；
2. 一个新的 `@themoss/protocol-pyth` package；
3. 一项只读 Query：`pyth.price`；
4. Core 的 `oracle` Category；
5. ABI 与 Feed 目录的离线生成和哈希校验；
6. 单元测试、类型 fixture、MCP 集成测试和 Monad mainnet 测试；
7. 双语 README 条目、package README 和 changeset；
8. 一份贡献日志，记录 AI 辅助、人工判断、失败与验证。

## 5. 完成计划

| 阶段 | 工作 | 退出条件 |
| --- | --- | --- |
| 1. 项目理解 | 阅读 `README`、`CONTRIBUTING`、`CONTEXT`、Protocol onboarding 和 ABI ADR | 能说明 Core、Protocol package 与 MCP composition 的边界 |
| 2. 选题排重 | 检查公开 Issues / PRs，避免重复已有 Adapter | 确认没有正在进行的 Pyth Adapter |
| 3. 来源固定 | 核对 Monad 官方部署注册表和 Pyth 官方 Solidity SDK | 地址、60 个 Feed、ABI 版本和哈希均可追溯 |
| 4. 核心实现 | 增加 `oracle` Category 与 Pyth Query package | build 和 typecheck 通过 |
| 5. 测试 | 添加离线、类型、来源、MCP 与 mainnet 测试 | 无效输入在 RPC 前失败；真实只读调用成功 |
| 6. 文档与发布 | 补 README、changeset、PR 模板和验证证据 | 分批 commit、push，PR 进入 Ready for review |
| 7. Review 跟进 | 阅读 CI 与维护者意见，修正合理问题 | 不擅自声称已合并；保留 review 记录 |

## 6. 主要风险与处理

### 风险一：选题与别人重复

先搜索 Moss 的公开 Issues 和 PRs。多个常见协议已经有人提交，因此改选当时没有公开进行中贡献的 Pyth。

### 风险二：把任意链上地址交给 Agent

不设计“调用者传地址”的通用 Oracle Query。合约地址、Feed ID 和允许的名称全部由 Protocol package 维护。

### 风险三：读取过期价格

不使用 `getPriceUnsafe` 作为公开 Query；使用 `getPriceNoOlderThan`，并把 `maxAgeSeconds` 设为有上下界的显式参数。

### 风险四：手写或截断 ABI

使用 Pyth 官方 npm package 中的完整 `IPyth` ABI，记录 package integrity、tarball SHA-256 与文件 SHA-256，并提供离线重建测试。

### 风险五：把本地通过误写成已经合并

本地测试、GitHub CI、review 和 merge 是四种不同证据。提交材料只记录实际状态，是否接受和合并由 Moss 维护者决定。

## 7. AI 协作与人工责任

AI 可以帮助我：

- 搜索重复选题并整理项目规则；
- 比较已有 Adapter 和已关闭 PR 的 review 意见；
- 生成代码初稿、测试矩阵、文档和 PR 描述；
- 运行命令并汇总可复现证据。

必须由我承担的人工判断包括：

- 是否授权 fork、push 和公开 PR；
- 选题是否适合第一次贡献；
- 官方地址、Feed ID、ABI 和链上结果是否可信；
- API 是否应该允许任意 Feed、最大旧价格范围是否合理；
- 是否接受维护者的修改意见；
- 最终钱包签名、资金操作和密钥管理。这个 Adapter 本身不执行这些动作。

## 8. 实际进展

计划已经落实为三个分批提交：

1. [`2beaa24`](https://github.com/echo5177/moss/commit/2beaa24)：增加 `oracle` Category；
2. [`0dd4413`](https://github.com/echo5177/moss/commit/0dd4413)：增加 Pyth package、来源快照与测试；
3. [`2490bf9`](https://github.com/echo5177/moss/commit/2490bf9)：接入默认 MCP 组合、README 与 changeset。

PR #146 已进入 **Ready for review**。PR 是否通过 CI、是否需要修改以及是否合并，继续以 GitHub 页面上的最新状态为准。

## 9. 参考资料

- [Moss CONTRIBUTING](https://github.com/nishuzumi/moss/blob/main/CONTRIBUTING.md)
- [Moss Protocol onboarding](https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md)
- [Moss ABI Origin ADR](https://github.com/nishuzumi/moss/blob/main/docs/adr/0007-abi-origin.md)
- [Monad protocol registry：Pyth](https://github.com/monad-crypto/protocols/blob/9fc1f09766739570f6e77f68bee0383d68cfeb66/mainnet/pyth.jsonc)
- [Pyth Solidity SDK 4.3.1](https://www.npmjs.com/package/@pythnetwork/pyth-sdk-solidity/v/4.3.1)
- [Pyth EVM price feed API](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan)

