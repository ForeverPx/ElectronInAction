const { windowCenter } = require('sugar-electron');
const winB = windowCenter.winB;
// 创建winB窗口实例
await winB.open();
// 订阅窗口创建完成“ready-to-show”
const unsubscribe = winB.subscribe('ready-to-show', async () => {
   // 解绑订阅
   unsubscribe();
  // 设置winB size[400, 400]
   const r1 = await winB.setSize(400, 400);
   // 获取winB size[400, 400]
   const r2 = await winB.getSize();
   console.log(r1, r2);
});