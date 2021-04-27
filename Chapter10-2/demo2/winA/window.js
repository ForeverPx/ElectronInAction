const { ipc } = require('sugar-electron');
// 每隔1s发布事件“greet”
setInterval(() => {
  ipc.publisher('greet', { message: 'Hello eveybody' });
}, 5000);