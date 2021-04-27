const { ipc } = require('sugar-electron');

const unsubscribe = ipc.subscribe('greet', (json) => {
  console.log(json);
});

// unsubscribe();  取消订阅