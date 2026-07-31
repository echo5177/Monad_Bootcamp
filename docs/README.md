# Monad Price Lens

Monad Price Lens 是 Prism Forge 的 Week 3 Mini Demo。它通过浏览器只读 `eth_call` 查询 Monad Mainnet 上的 Pyth PriceFeed，把原始 `price`、`conf`、`expo` 和 `publishTime` 转换成可读价格卡。

## 功能

- MON/USD、BTC/USD、ETH/USD 三个白名单 Feed。
- 价格、置信值、置信比例、价格区间、带时区的发布时间和新鲜度。
- 查询使用的区块高度、UTC 查询时间和 RPC endpoint。
- 合约、Feed ID 与原始响应可追溯。
- 不连接钱包，不签名，不发交易，不需要 API Key。
- 网络失败或数据超过 maxAge 时明确报错，不自动伪造成功结果。

## 本地运行

在仓库根目录执行：

```powershell
python -m http.server 4173 --directory docs
```

然后打开 `http://127.0.0.1:4173/`。

## 测试

```powershell
node --test tests/price-utils.test.mjs
```

## 真实与 Mock

主流程直接读取 Monad 公共 RPC 和 Pyth 合约，没有静态价格 Mock。仓库中的截图是指定时间的体验证据，只能证明截图时的页面状态。

## 安全说明

这是学习与研究工具，不构成投资建议。Fresh 仅表示数据满足所选 maxAge，不代表价格无误差、交易无风险或适合任何具体用途。

页面中的 Pyth 合约地址已按 2026-07-31 的官方状态核对。Pyth 已公告 Monad 的 Core 合约将在 2026-08-18 升级，因此后续使用前应重新检查[官方 EVM 地址表](https://docs.pyth.network/price-feeds/core/contract-addresses/evm)。

完整任务材料见 [Week 3 Submission Index](../WEEK3_SUBMISSION_INDEX.md)。
