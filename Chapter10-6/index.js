const { start } = require('repl');
const { Service, start } = require('sugar-electron');

start().then(()=>{
  const service = new Service('service-demo', path.join(__dirname, 'service-demo.js'), true);
  service.on('success', function () {
    console.log('service进程启动成功');
  });
  service.on('fail', function () {
    console.log('service进程启动异常');
  });
  service.on('crashed', function () {
    console.log('service进程崩溃');
    service.start();
  });
  service.on('closed', function () {
    console.log('service进程关闭');
  });

  service.start();
});

