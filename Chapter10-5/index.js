const { plugins, start} = require('sugar-electron');

start().then(()=>{
  plugins.console.log('hello world');
});
