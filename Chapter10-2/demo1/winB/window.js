const { ipc } = require('sugar-electron');
// 注册响应事件
ipc.response('get/name', (json, cb) => {
  // 请求参数
  console.log(json); // { name: '我是winA' }
  cb({ name: '我是winB' });
});