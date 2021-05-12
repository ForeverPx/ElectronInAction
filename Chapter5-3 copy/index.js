const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

app.setLoginItemSettings({
  openAtLogin: true,
  name: 'sysInfoApp',
  args: ['C:\\Users\\panxiao\\Desktop\\Demos\\ElectronInAction\\Capture5-3\\']
});

app.setAsDefaultProtocolClient('sysInfoApp'
  ,process.execPath
  ,['C:\\Users\\panxiao\\Desktop\\Demos\\ElectronInAction\\Capture5-3\\']);

const winTheLock = app.requestSingleInstanceLock();
if(winTheLock){
  function getSchemeUrl(argv){
    for(let i=0; i<argv.length;i++){
      if(argv[i].indexOf('sysinfoapp') === 0){
        return argv[i];
      }
    }
    return null;
  }

  // 当有第二个实例准备启动时
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    const schemeUrl = getSchemeUrl(commandLine);
    if(schemeUrl){
      // 本次启动是通过自定义协议启动的，下面处理对应逻辑
    }else{
      // 非自定义协议启动
    }
  })

  app.on('ready', function (){
    if (process.argv.length > 1) {
      app.emit("second-instance", null, process.argv);
    }
  })
}else{
  app.quit();
}
