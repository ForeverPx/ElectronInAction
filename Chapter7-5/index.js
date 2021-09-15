const { app, globalShortcut, screen, BrowserWindow, Menu, Tray} = require('electron');
const url = require('url');
const path = require('path');

let window = null;
let tray = null;

app.whenReady().then(() => {
  const result = globalShortcut.register(`Ctrl+0`, function(){
    window.webContents.send('begin-capture');
  })
  if(!result){
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

  function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    window = new BrowserWindow({
      width: width,
      height: height,
      show: false, //默认不显示窗口
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
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
    createWindow();
    tray = new Tray(path.join(__dirname, './logo.png'));
    const contextMenu = Menu.buildFromTemplate([
      { label: '截屏', type: 'normal', click: function(){
        window.webContents.send('begin-capture');
      }},
      { label: '退出', type: 'normal', click: function(){
        app.quit();
      }}
    ])
    tray.setToolTip('Screen Capture')
    tray.setContextMenu(contextMenu)
  })
}else{
  console.log('quit');
  app.quit();
}
