const { store } = require('sugar-electron');
const userModule = store.getModule('user');

console.log(userModule.state.name); // 张三

// 监听user改变
const unsubscribe = userModule.subscribe((data) => {
  console.log(user.state.name); // 李四
});

userModule.setState({
  name: '李四'
});