const electron = require('electron');
const { app, globalShortcut } = require('electron');
const url = require('url');
const path = require('path');

let timeWindow = null;
let previewWindow = null;

app.whenReady().then(() => {
  const startShortcutResult = globalShortcut.register(`Ctrl+9`, function(){
    timeWindow.webContents.send('begin-record');
    previewWindow.webContents.send('begin-record');
    previewWindow.hide()
    timeWindow.show();
  })
  const stopShortcutResult = globalShortcut.register(`Ctrl+0`, function(){
    timeWindow.webContents.send('stop-record');
    previewWindow.webContents.send('stop-record');
    timeWindow.hide();
    previewWindow.show()
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
    const timeWindowUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'timeWindow/index.html')
    })
    timeWindow = createWindow(timeWindowUrl, {
      width: 600,
      height: 400,
      show: false, //默认不显示窗口
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    const previewWindowUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'previewWindow/index.html')
    })

    previewWindow = createWindow(previewWindowUrl, {
      width: 600,
      height: 100,
      show: false, //默认不显示窗口
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })
  })
}else{
  console.log('quit');
  app.quit();
}
