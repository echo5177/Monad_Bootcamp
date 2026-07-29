# Moss 新手教程：从本地构建到读取 Monad 上的 Pyth 价格

> 目标：不使用私钥、不发送交易，完成 Moss 的安装、构建、离线测试和一次真实 Monad mainnet Query。  
> 练习分支：[echo5177/moss:agent/pyth-oracle-adapter](https://github.com/echo5177/moss/tree/agent/pyth-oracle-adapter)  
> 对应 PR：[nishuzumi/moss#146](https://github.com/nishuzumi/moss/pull/146)

## 1. 完成后你会得到什么

完成本教程后，你应该能够：

1. 说明 Moss 的 `discover → load → action → simulate` 工作流；
2. 在本地安装并构建 Moss monorepo；
3. 区分离线测试和真实 Monad RPC 测试；
4. 读取 `pyth.price` 的参数说明；
5. 从 Monad mainnet 读取 `MON_USD` 价格；
6. 理解 Pyth 返回的 `price`、`confidence`、`exponent` 和 `publishTime`；
7. 找到 Adapter 的地址、ABI、Feed 来源和测试。

本教程使用一份仍在 review 中的贡献分支。它适合学习和验证，不代表功能已经进入 Moss 的 `main`。

## 2. 环境准备

需要：

- Git；
- Node.js 22 或更高版本；
- pnpm 11；
- 可以访问 GitHub、npm registry 和 Monad public RPC 的网络。

检查版本：

```bash
git --version
node --version
pnpm --version
```

不需要：

- 私钥或助记词；
- 有余额的钱包；
- `.env` 文件；
- MonadScan API Key。

本教程只读取公开链上状态。

## 3. 克隆贡献分支

```bash
git clone --branch agent/pyth-oracle-adapter --single-branch https://github.com/echo5177/moss.git moss-pyth
cd moss-pyth
```

确认当前分支和三个分批提交：

```bash
git branch --show-current
git log --oneline -3
```

预期分支名是：

```text
agent/pyth-oracle-adapter
```

三个提交分别负责 Core Category、Pyth package 和 MCP 集成。把大改动拆开后，reviewer 可以分别检查框架类型、Adapter 本体和应用组合。

## 4. 安装依赖

```bash
pnpm install --frozen-lockfile
```

Moss 是 pnpm monorepo，workspace 范围包括：

```text
packages/*
packages/protocols/*
examples/*
```

`pnpm-lock.yaml` 固定了依赖版本；`--frozen-lockfile` 会在 package 声明与锁文件不一致时直接失败，而不是静默改锁文件。

## 5. 依次构建、类型检查和 lint

```bash
pnpm build
pnpm typecheck
pnpm lint
```

顺序不能随意交换。Moss 的 workspace package 会从已构建的 `dist/*.d.ts` 解析彼此的类型，所以先 build，再 typecheck。

如果命令失败，先看第一条真实错误，不要只看最后的 `ELIFECYCLE`。常见原因包括：

- Node 版本低于 22；
- pnpm 大版本不匹配；
- 安装过程被中断；
- 锁文件与 package 声明不一致；
- 网络没有完整下载依赖。

## 6. 先运行离线测试

离线测试会跳过真实 RPC 路径，适合先验证参数、类型和输出结构。

### PowerShell

```powershell
$env:MOSS_SKIP_E2E = "1"
pnpm test
Remove-Item Env:MOSS_SKIP_E2E
```

### Bash

```bash
MOSS_SKIP_E2E=1 pnpm test
```

Pyth package 的离线测试重点检查：

- Registry 能发现 `pyth.price`；
- `load` 能显示 Feed 枚举和 `maxAgeSeconds` 的范围；
- `MON_USD` 会映射到固定的官方 Feed ID；
- 默认新鲜度限制是 3600 秒；
- 未知 Feed、0、超过 86400 或小数秒数会在 RPC 前失败；
- 链上 `bigint` 会转换为 JSON-safe 字符串；
- ABI 和 Feed 目录可以从提交的来源文件逐字节重建；
- 正确和错误的 TypeScript 使用方式都有 fixture。

离线通过不能证明地址上真的有合约，也不能证明 Feed 当前有数据；这些要由下一步验证。

## 7. 运行真实 Monad mainnet 测试

```bash
pnpm --filter @themoss/protocol-pyth test:online
```

这个测试会：

1. 连接默认的 `https://rpc.monad.xyz`；
2. 检查 chain ID 是 `143`；
3. 检查 Pyth PriceFeed 地址存在 bytecode；
4. 通过 Adapter 读取 `MON_USD`；
5. 确认价格为正数；
6. 确认 `publishTime` 不在未来，且没有超过测试允许的新鲜度；
7. 确认结果可以安全地 `JSON.stringify`。

它不会签名或发送交易。测试中的 account 是一个占位地址，因为 Query 只读。

如果 RPC 临时限流或不可用，离线测试仍然可以运行；但不能把“RPC 失败”写成“Adapter 错误”，也不能把“离线通过”写成“链上已验证”。应记录各自的证据边界后重试。

## 8. 认识 `pyth.price`

Adapter 注册为：

```text
Protocol: pyth
Category: oracle
Method:   price
Kind:     query
```

参数：

| 参数 | 含义 | 约束 |
| --- | --- | --- |
| `feed` | 要读取的官方 Pyth Feed | Monad 官方 60 个 Feed 之一，例如 `MON_USD` |
| `maxAgeSeconds` | 允许价格距当前时间最多旧多少秒 | 1–86400 的整数；默认 3600 |

输出：

| 字段 | 含义 |
| --- | --- |
| `feed` | 调用时选择的 Feed 名称 |
| `feedId` | package 内固定的 32-byte Pyth Feed ID |
| `price` | 价格整数，使用字符串避免 JSON 丢失精度 |
| `confidence` | 置信区间整数，同样使用字符串 |
| `exponent` | 十进制指数 |
| `publishTime` | Unix 秒级发布时间，使用字符串 |

真实价格的计算方式是：

```text
price × 10^exponent
```

例如下面只是格式示意，不是当前实时价格：

```json
{
  "price": "123456789",
  "confidence": "10000",
  "exponent": -8,
  "publishTime": "1785312000"
}
```

其价格是 `123456789 × 10^-8 = 1.23456789`。显示时不要擅自丢掉 `confidence` 和 `publishTime`，因为“价格是多少”和“这条价格有多旧、误差范围多大”是不同问题。

## 9. 自己运行一次 Query

在 `packages/protocols/pyth/` 下新建本地练习文件 `demo/read-price.ts`：

```ts
import { createRuntime, Registry } from "@themoss/core";
import { getAddress } from "viem";
import { Pyth } from "../src/index.js";

const runtime = await createRuntime({
  rpcUrl: "https://rpc.monad.xyz",
});

const registry = new Registry(runtime).use(Pyth);
const account = getAddress("0xcccccccccccccccccccccccccccccccccccccccc");

console.log(registry.discover({ category: "oracle" }));
console.log(registry.load([{ protocol: "pyth", method: "price" }]));

const result = await registry.action("pyth", "price", account, {
  feed: "MON_USD",
  maxAgeSeconds: 3600,
});

console.log(JSON.stringify(result, null, 2));
```

在仓库根目录运行：

```bash
pnpm --filter @themoss/protocol-pyth exec tsx demo/read-price.ts
```

这里依次体验了三个阶段：

1. `discover` 找到 `oracle` Query；
2. `load` 查看参数和默认值；
3. `action` 执行只读 Query。

没有调用 `simulate`，因为 Query 不构建交易。`simulate` 用于 Capability 产生的未签名交易树。

练习文件不是 Adapter 必需内容。完成后可以保留在自己的分支，也可以不提交。

## 10. 检查地址、Feed 和 ABI 来源

关键文件：

```text
packages/protocols/pyth/
├── sources/
│   ├── IPyth.json
│   ├── pyth.jsonc
│   └── VENDOR.json
├── scripts/
│   ├── gen-sources.ts
│   ├── sources.ts
│   └── update-sources.ts
├── src/
│   ├── abis/pyth.ts
│   ├── adapter.ts
│   ├── feeds.ts
│   └── index.ts
├── test/
└── test-online/
```

- `sources/IPyth.json` 来自固定版本的 Pyth 官方 Solidity SDK；
- `sources/pyth.jsonc` 来自固定 commit 的 Monad 官方协议注册表；
- `VENDOR.json` 记录版本、commit、blob、URL 和哈希；
- `gen:sources` 只使用已提交的来源离线生成 TypeScript；
- `update:sources` 重新下载固定 URL，并在内容哈希不同的时候失败。

验证离线生成没有漂移：

```bash
pnpm --filter @themoss/protocol-pyth gen:sources
git diff --exit-code
```

如果最后一条命令没有输出并返回 0，说明生成结果与仓库提交一致。

## 11. 为什么不开放任意 Feed ID

看起来更“通用”的 API 可能是：

```text
price(feedId: bytes32)
```

但这会把关键协议知识重新交回 Agent。Agent 可能传错 ID、使用另一条链的 Feed，或让用户误以为结果属于受支持目录。

当前 Adapter 使用：

```text
price(feed: "MON_USD" | "BTC_USD" | ...)
```

名称到 Feed ID 的映射由 package 维护，并从 Monad 官方注册表生成。减少自由度是刻意的安全边界。

## 12. 为什么不使用 `getPriceUnsafe`

`getPriceUnsafe` 会返回价格和发布时间，但不会根据调用者的要求拒绝旧数据。调用方如果忘记检查 `publishTime`，就可能把过期价格当成当前价格。

Adapter 公开的是：

```text
getPriceNoOlderThan(feedId, maxAgeSeconds)
```

合约负责检查新鲜度；过期时调用失败。Adapter 仍然返回 `publishTime`，让 Agent 和用户能够看到证据，而不是只得到一个脱离时间的数字。

## 13. 下一步练习

完成本教程后，可以继续：

1. 把 `feed` 改成 `BTC_USD` 或 `ETH_USD`，比较指数和发布时间；
2. 把 `maxAgeSeconds` 改小，观察旧价格失败路径；
3. 阅读 `test/adapter.test.ts`，理解如何在不访问 RPC 时 mock 合约读取；
4. 阅读 `test/types.fixture.ts`，理解 `@ts-expect-error` 如何保护导出类型；
5. 在 MCP client 中启动构建后的 server，使用 `discover` 和 `load` 查看 `pyth.price`；
6. 关注 PR #146 的 CI 与 review，区分“本地通过”“CI 通过”“review 通过”和“已合并”。

## 14. 安全提醒

- 不要把私钥、助记词、钱包密码、API Key 或 `.env` 提交到 GitHub；
- 本教程只读，不需要把真实钱包连接到脚本；
- 不要根据一次价格 Query 直接进行真实资金交易；
- Pyth 数据、RPC、合约和 Adapter 都可能出现延迟或故障；
- Moss 是未审计的 alpha 软件，应以学习和审查为主。

