# Week 2 Role Choice Card 提交稿

## 提交页面

https://github.com/echo5177/Monad_Bootcamp/blob/main/WEEK2_ROLE_CHOICE_CARD.md

该页面位于 public GitHub 仓库中，无需登录即可访问。

## 可直接提交版本

**主方向：Dev**

**选择理由：**

Week 1 中，我已经完成课程钱包连接、Solidity `CheckIn` 合约检查、Remix 编译与部署、Read / Write 调用和 Explorer 验证。这个过程让我确认，相比只研究或传播产品，我更希望解决“如何把链上规则变成用户能够实际操作的功能”。我已经走通合约部署和手动交互，但仍需要继续学习合约测试、前端钱包连接、交易状态反馈、事件读取和链上数据展示，因此选择 Dev。

**希望服务的问题：**

我希望推进 Monad Community Quest，让社区任务、积分和领取记录可以被公开验证，并减少同一钱包重复领取同一任务奖励的问题。最小合约会记录任务 ID、固定积分、钱包完成状态和积分变化，并发出任务完成事件。它暂时不能自动证明用户真实完成了链下活动；链下任务真实性仍需要管理员确认、服务器签名、链上行为证明或其他验证机制。

**本周最小产出：**

一个可编译、可部署、可交互的 `CommunityQuest.sol v0.1`，配套 README，并保存一组 Monad 测试环境交互证据。最小功能包括：

1. 任务 ID 和固定积分；
2. `completeQuest(questId)`；
3. 防止同一钱包重复领取；
4. `getMyScore()`；
5. `QuestCompleted` 事件；
6. 至少一次成功完成任务和一次重复领取失败的验证记录。

最小网页是加分项，不作为本周合约交付的阻塞条件。

**参考资料：**

1. [Monad Developer Guides](https://docs.monad.xyz/guides)
2. [Monad Developer Essentials](https://docs.monad.xyz/developer-essentials/summary)
3. [Solidity — Structure of a Contract](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html)
4. [Solidity ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html)
5. [Viem Getting Started](https://viem.sh/docs/getting-started)
6. [我的 Week 1 Mini Demo 0](https://github.com/echo5177/Monad_Bootcamp/blob/main/MINI_DEMO_0.md)

**Week 3 角色：**

Community Quest 的 **智能合约与 DApp 集成负责人**。我将负责合约数据结构和接口、测试网部署、ABI 与地址整理，以及使用 Viem 接入钱包、Read / Write 调用和交易状态；同时与 Research 角色确认链上必要性，与 Ops 角色确认用户流程和任务规则。

**一句话总结：**

> 我选择 Dev，计划把 Week 1 的 CheckIn 合约扩展为可验证任务完成、积分和防重复领取的 Community Quest 最小合约，并在 Week 3 负责智能合约与 DApp 集成。

## 提交前核对

- [x] 主方向：Dev
- [x] 选择理由
- [x] 希望服务的问题
- [x] Week 2 最小产出
- [x] 参考资料
- [x] Week 3 角色
- [x] 页面链接公开可访问
- [x] 不包含私钥、助记词、API Key、`.env` 或未公开链接
