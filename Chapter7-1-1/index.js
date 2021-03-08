const electron = require('electron');
const { app, ipcMain, globalShortcut} = require('electron');
const url = require('url');
const path = require('path');

let window = null;

app.whenReady().then(() => {
  const result = globalShortcut.register(`Command+0`, function(){
    console.log(`Command+0`);
    window.webContents.send('begin-capture');
  })
  if(!result){
    console.log('注册快捷键失败');
  }else{
    console.log('注册快捷键成功');
  }
})

// const winTheLock = app.requestSingleInstanceLock();
// if(winTheLock){
  // app.on('second-instance', (event, commandLine, workingDirectory) => {
  //   if (window) {
  //     if (window.isMinimized()){
  //       window.restore();
  //     }
  //     window.focus();
  //   }
  // })


  function createWindow() {
    window = new electron.BrowserWindow({
      width: 600,
      height: 400,
      show: true,
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

    createWindow()
  })
// }else{
//   console.log('quit');
//   app.quit();
// }
