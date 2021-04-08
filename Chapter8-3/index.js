const electron = require('electron');
const { app, globalShortcut, screen} = require('electron');
const url = require('url');
const path = require('path');
const errorHandler = require('./errorHandler');

errorHandler({isAutoLogFile: true}, ()=>{});

let window = null;

app.whenReady().then(() => {
  createWindow();

  const result = globalShortcut.register(`Ctrl+0`, function(){
    window.webContents.send('begin-capture');
  })
  if(!result){
    console.log('注册快捷键失败');
  }else{
    console.log('注册快捷键成功');
  }
})


// app.on('second-instance', (event, commandLine, workingDirectory) => {
//   if (window) {
//     if (window.isMinimized()){
//       window.restore();
//     }
//     window.focus();
//   }
// })

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  window = new electron.BrowserWindow({
    width: width,
    height: height,
    show: true, //默认不显示窗口
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
});