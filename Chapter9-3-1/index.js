const electron = require('electron');
const { app, globalShortcut, screen} = require('electron');
const url = require('url');
const path = require('path');
const {autoUpdater} = require("electron-updater");
let window = null;

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  console.log('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available.');
})
autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  console.log(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded');
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  const result = globalShortcut.register(`Ctrl+0`, function(){
    window.webContents.send('begin-capture');
  })
  if(!result){
    console.log('reg fail');
  }else{
    console.log('reg success');
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
    window = new electron.BrowserWindow({
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
    autoUpdater.checkForUpdatesAndNotify().then((res)=>{
      console.log('update sucess');
    }).catch((e)=>{
      console.log('update fail', e);
    });
  })
}else{
  console.log('quit');
  app.quit();
}
