# Week 3 Other Team Product Experience

## 体验对象

- 作品：**Monad Omikuji / 链上御神签**
- 作者：训练营公开笔记中的 Kokaro233
- 在线 Demo：[monad-omikuji.vercel.app](https://monad-omikuji.vercel.app/)
- GitHub：[Kokaro233/monad-omikuji](https://github.com/Kokaro233/monad-omikuji)
- 训练营来源：[公开学生笔记](https://github.com/IntensiveCoLearning/monad-builder-camp/blob/main/notes/Kokaro233.md)

## 实际体验记录

2026-07-31（UTC+8）使用 Chrome 打开公开 Demo：

1. 页面成功加载，标题为“Monad Omikuji — 链上御神签”，控制台没有 error。
2. 首屏用月夜神社、像素角色和清楚的四步说明建立抽签场景。
3. 页面当时显示 63 条已验证御签，并说明链上与访客祈愿共 147 份。这是体验时的动态快照，不代表之后仍是相同数字。
4. 在钱包未连接状态点击“求取御神签”，进入“御神签祈愿仪式”。页面提示访客体验剩余 5 次，并说明结果暂存在本设备，登录后再归入账号。
5. 到此停止，没有连接钱包、签名或发送交易。

## 做得好的地方

- 视觉不是装饰层，而是从首页、仪式到收藏都服务于同一个“求签”故事。
- 首屏同时给出四步流程和链上计数，让用户知道交互会走向哪里。
- 未连接钱包的状态很清楚，访客可以先进入体验路径。
- 项目 README 明确区分真实交易与 Demo Mode，并说明失败交易不会静默变成模拟成功。这是很好的真实/Mock 边界。

## 可以改进的地方

首页四步说明把“连接钱包”放在第一步，但实际点击主按钮后又提供五次访客体验。新用户可能不确定到底能否先试用。可以把第一步改成“先访客体验，连接钱包后上链收藏”，让入口文案和真实流程一致。

## 对 Monad Price Lens 的启发

Monad Omikuji 证明了“先进入场景，再解释链上动作”比先堆技术术语更容易理解。Price Lens 不需要复制它的视觉风格，但应该像它一样把边界放在操作附近。因此我们的 V2 在结果卡内直接解释 Confidence 和 FRESH，而不是只把说明放在页面下方。

## 体验截图

![Monad Omikuji 公开 Demo 首屏](docs/screenshots/other-team-monad-omikuji.png)

## 可直接提交的说明

我实际打开并进入了 Monad Omikuji 的访客祈愿流程，记录了作品链接、体验步骤、优点、改进建议、对自己项目的启发和截图；没有连接钱包或冒充完成链上交易。
