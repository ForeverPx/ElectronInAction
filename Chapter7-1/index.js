const electron = require('electron');
const { app, ipcMain, globalShortcut, shell} = require('electron');
const url = require('url');
const path = require('path');

ipcMain.on('registerShortcut', (event, data) => {
  try {
    console.log(data);
    const dataObj = JSON.parse(data);
    const result = globalShortcut.register(dataObj.shortcut, function(){
      shell.openExternal(dataObj.url);
    })
    if(!result){
      console.log('注册快捷键失败');
    }else{
      console.log('注册快捷键成功');
    }
  } catch (error) {
    console.log(error)
  }
})

let window = null;
const winTheLock = app.requestSingleInstanceLock();
if(winTheLock){
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (window) {
      if (window.isMinimized()){
        window.restore();
      }
      window.focus();
    }
  })

  function createWindow() {
    window = new electron.BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true
      }
    })

    const urls = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'index.html')
    })


    window.loadURL(urls)

    window.on('close', function(){
      window = null;
    })
  }

  app.on('window-all-closed', function () {
    app.quit();
  })

  app.on('ready', function () {
    createWindow()
  })
}else{
  console.log('quit');
  app.quit();
}
