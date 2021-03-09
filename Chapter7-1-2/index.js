const electron = require('electron');
const { app, globalShortcut, screen} = require('electron');
const url = require('url');
const path = require('path');

let timeWindow = null;
let previewWindow = null;

app.whenReady().then(() => {
  const startShortcutResult = globalShortcut.register(`Ctrl+9`, function(){
    window.webContents.send('begin-record');
  })
  const stopShortcutResult = globalShortcut.register(`Ctrl+0`, function(){
    window.webContents.send('stop-record');
  })
  if(!startShortcutResult || !stopShortcutResult){
    console.log('注册快捷键失败');
  }else{
    console.log('注册快捷键成功');
  }
})

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

  function createWindow(url, options) {
    const window = new electron.BrowserWindow(options);
    window.loadURL(url)

    window.on('close', function(){
      window = null;
    })

    return window;
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
