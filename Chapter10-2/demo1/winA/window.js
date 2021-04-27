const { ipc } = require('sugar-electron');
// 向winB发起请求
const res = await ipc.request('winB', 'get/name', { name: '我是winA' });
console.log(res); // { name: '我是winB' }