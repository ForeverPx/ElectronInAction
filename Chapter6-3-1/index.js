/**
 * @desc electron 主入口
 */
const path = require('path');
const { app, BrowserWindow, ipcMain} = require('electron');

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

function createWindow() {
  // 创建浏览器窗口
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  window.loadURL(`http://127.0.0.1:7001`);
}

global.ROOT_PATH = app.getPath('userData');