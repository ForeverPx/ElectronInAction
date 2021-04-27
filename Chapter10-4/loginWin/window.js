const { store } = require('sugar-electron');

const userModule = store.getModule('user');
userModule.setState({
  name: '张三'
});