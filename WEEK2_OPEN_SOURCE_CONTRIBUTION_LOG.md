# Week 2｜Open Source Contribution Log：Moss Pyth Adapter

> 贡献日期：2026-07-29（UTC+8）  
> GitHub：[echo5177](https://github.com/echo5177)  
> 上游项目：[nishuzumi/moss](https://github.com/nishuzumi/moss)  
> Pull Request：[nishuzumi/moss#146](https://github.com/nishuzumi/moss/pull/146)

## 1. 本次 Proof of Work

我向 Moss 提交了一个真实、公开、可 review 的 Protocol Adapter PR：

**Pyth Monad Oracle Adapter**

它为 Moss 增加只读的 `pyth.price` Query，让 Agent 使用 Monad 官方 PriceFeed 和 60 个官方 Feed 名称读取价格，并通过 `getPriceNoOlderThan` 拒绝超过调用者新鲜度限制的数据。

截至 2026-07-29，本 PR 的公开状态是：

| 项目 | 状态 |
| --- | --- |
| PR | Open |
| Review 状态 | Ready for review，非 Draft |
| GitHub 可合并性 | Mergeable |
| Commits | 3 |
| Changed files | 31 |
| Diff | `+2573 / -5` |
| Review / Merge | 尚未发生，以 PR 页面最新状态为准 |
| GitHub Actions | PR 页面尚未显示 check；不把本地测试写成 GitHub CI |

是否接受和合并属于维护者判断。本任务的完成标准是提交一份有代码、测试、文档和来源证据的 PR，不是自行宣称贡献已被上游采用。

## 2. 为什么选择这个贡献

我先检查了 Moss 的公开 Issues 和 Pull Requests。常见协议 Adapter 已有多人认领或提交，如果继续做同一目标，会增加重复 review 成本。

Pyth 当时没有公开的进行中 Adapter，而且适合第一次贡献：

- 功能是只读 Query，不构建或发送交易；
- 能练习 Protocol、Category、参数 Schema、ABI 与部署来源；
- 能用真实 Monad mainnet 验证；
- 范围足够小，但仍涉及 Core、package、MCP composition、测试和文档；
- “价格新鲜度”是具体的安全问题，不是只增加一个函数名。

## 3. 分批 commit 记录

### Commit 1：Core Category

[`2beaa24 feat(core): add oracle protocol category`](https://github.com/echo5177/moss/commit/2beaa247be272e6884b53c203402a28eb1165f32)

完成：

- 在 Core 的闭合 Category 集合中增加 `oracle`；
- 更新 `CONTEXT.md`；
- 增加正向 `oracle` 和反向非法 Category 类型 fixture；
- 单独运行 Core build、typecheck 和 32 个测试。

为什么单独提交：Category 是框架公共类型，不应和某个 Adapter 的大批生成文件混在一起。

### Commit 2：Pyth Protocol package

[`0dd4413 feat(pyth): add Monad price feed adapter`](https://github.com/echo5177/moss/commit/0dd44137142b283ee010ed9e96441ffe85a2996a)

完成：

- 新增 `@themoss/protocol-pyth`；
- 新增 `pyth.price` Query；
- 加入 Monad 官方 60 个 Feed 的名称 allowlist；
- 默认新鲜度 3600 秒，允许范围 1–86400；
- 使用 `getPriceNoOlderThan`；
- 返回 JSON-safe 的 `price`、`confidence`、`exponent` 和 `publishTime`；
- vendoring 完整 IPyth ABI 与 Monad Pyth 注册表；
- 记录 npm package integrity、tarball SHA-256、文件 SHA-256、Git commit 和 blob；
- 增加离线生成脚本、单元测试、类型 fixture 和 mainnet 测试；
- 增加 package README。

为什么单独提交：这是 Adapter 的主要功能和证据，可以独立 review。

### Commit 3：MCP 与发布集成

[`2490bf9 feat(mcp): include Pyth in default composition`](https://github.com/echo5177/moss/commit/2490bf951b9e673b867e3c8c22619c5497cf7d5b)

完成：

- 将 Pyth 加入 MCP server 的显式默认 composition；
- 测试 `discover({ category: "oracle" })` 和 `load(pyth.price)`；
- 更新英文和中文 README 的支持列表；
- 更新 changeset linked package；
- 增加用户可见的 changeset；
- 更新 pnpm lockfile。

为什么单独提交：Protocol package 拥有协议语义，是否进入默认应用组合是另一层明确选择。

## 4. 关键人工判断

### 4.1 不允许任意 Feed ID

最通用的接口会让调用者直接传 `bytes32 feedId`。我没有这样设计，因为它把关键协议知识重新交给 Agent。当前 API 只接受官方 Feed 名称，由 package 维护名称到 ID 的映射。

### 4.2 不公开 unsafe 价格读取

完整 ABI 中保留了 `getPriceUnsafe`，但公开 Query 只调用 `getPriceNoOlderThan`。完整 ABI 是来源真实性要求；暴露哪种语义则是 Adapter 的安全边界。

### 4.3 不把“更新价格”做成 Capability

Pyth ABI 包含 payable 的更新方法，但第一次贡献只做读取。价格更新涉及 update data、费用和交易语义，会显著扩大安全与测试范围。

### 4.4 原始数值不擅自格式化

Adapter 返回整数价格、置信区间和指数，没有把动态值转成 JavaScript 浮点数。调用方可以按 `price × 10^exponent` 显示，同时保留原始精度。

### 4.5 来源必须可复现

地址和 Feed 来自固定 commit 的 Monad 官方注册表；ABI 来自固定版本的 Pyth 官方 npm package。生成脚本在哈希不同或函数集合变化时失败，而不是静默接受上游漂移。

## 5. 验证证据

### 5.1 全仓验证

| 验证 | 结果 |
| --- | --- |
| `pnpm lint` | 通过 |
| `pnpm build` | 12 个非 private / 有脚本的 workspace project 构建通过 |
| `pnpm typecheck` | 全部 workspace 类型检查通过 |
| `MOSS_SKIP_E2E=1 pnpm test` | 198 个测试通过；按预期跳过在线测试 |
| Pyth 离线测试 | 9 个通过 |
| Pyth live mainnet test | 1 个通过 |

### 5.2 真实 Monad Query

在线测试和教程代码都完成了只读验证：

- chain ID：`143`；
- PriceFeed：`0x2880aB155794e7179c9eE2e38200202908C17B43`；
- bytecode：存在；
- Feed：`MON_USD`；
- Feed ID：`0x31491744e2dbf6df7fcf4ac0820d18a609b49076d45066d3568424e62f686cd1`；
- Query：成功返回正价格、置信区间、指数和发布时间；
- 输出：可以 `JSON.stringify`；
- 私钥 / 资金：不需要。

一次教程验证中观察到的动态样例为：

```json
{
  "price": "2079276",
  "confidence": "2279",
  "exponent": -8,
  "publishTime": "1785330007"
}
```

这只是 2026-07-29 的一次读取证据，不是当前报价，也不构成交易建议。

## 6. 失败与修复

### 6.1 多个候选 Adapter 已有进行中 PR

最初查看的多个协议已经有贡献者工作。修复方式不是抢同一选题，而是搜索公开 Issue / PR 后改选 Pyth。

### 6.2 ABI 与 Feed 不能靠复制后口头说明

只写“来自官方”无法防止内容被手工修改。修复为：提交原始来源、版本、commit、blob 和哈希，再由脚本离线生成 TypeScript，并用测试做逐字节比较。

### 6.3 pnpm 在非交互环境重建依赖时中断

一次依赖目录重建因非 TTY 检查超时。修复后重新用明确的 CI / lockfile 参数完成安装，再从 lint、build、typecheck 到测试全部重跑，没有把中断前的结果当成最终证据。

### 6.4 第一次内联验证命令的 PowerShell 引号被剥离

代码本身没有运行，esbuild 在 import 处报解析错误。随后创建与教程完全相同的临时 `.ts` 文件，用正式命令成功执行真实 Query，再删除临时文件。这个过程区分了 shell quoting 问题和 Adapter 问题。

## 7. AI 辅助与人工边界

| 环节 | AI 辅助 | 人工判断 |
| --- | --- | --- |
| 选题 | 搜索公开 Issues / PRs，比较候选范围 | 决定避开重复选题并选择 Pyth |
| 项目规则 | 整理 CONTRIBUTING、CONTEXT、ADR 和模板要求 | 判断哪些规则适用于本次 Query-only package |
| API 设计 | 给出 Feed schema、新鲜度和输出结构草案 | 决定不接受任意 Feed ID、不公开 unsafe Query |
| 来源 | 获取官方注册表、SDK 元数据与哈希 | 判断来源是否权威、是否固定到不可变版本 |
| 编码 | 生成实现、测试、脚本和文档初稿 | 审查 package 边界、错误路径和安全范围 |
| 验证 | 执行 build、typecheck、lint、test 和 RPC Query | 判断每项证据能证明什么，不能证明什么 |
| GitHub | 分批 commit、push，生成 PR 描述 | 授权公开 fork / PR，决定进入 Ready for review |
| Review | 可以解释和修订反馈 | 是否接受维护者建议、如何改动由我负责 |

AI 没有私钥、签名权或 merge 权，也不能替上游维护者接受贡献。

## 8. 学习收获

1. 一个 Protocol Adapter 不只是 ABI wrapper，还要负责地址、参数语义、来源、测试和应用组合边界。
2. “完整 ABI”和“只公开安全语义”并不矛盾：来源要完整，Agent 能调用的方法可以更窄。
3. 本地通过、真实链上通过、GitHub CI、review 和 merge 是五个不同阶段，记录时不能混写。
4. 好的 commit 边界能让 reviewer 看见框架、功能和集成三个独立决策。
5. 第一次开源贡献的成功不等于立即合并；提交可审查证据并认真响应 review，本身就是有效 Proof of Work。

## 9. 下一步

- 关注 PR #146 的 CI 与维护者反馈；
- 对合理的 review 意见继续分批修正；
- 如果维护者认为 `oracle` Category 或 package API 需要调整，先理解项目边界再修改；
- 不在尚未合并时把 Pyth 写成 Moss `main` 已支持功能；
- 把这次来源校验和 Query 测试方法复用到下一个小型 Adapter。

