/**
 * @desc electron 主入口
 */
const path = require('path');
const { app, BrowserWindow, ipcMain} = require('electron');

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  });

  mainWindow.loadURL(`http://127.0.0.1:7001`);
}

app.whenReady().then(() => {
  createWindow();
});

global.ROOT_PATH = path.join(app.getAppPath());