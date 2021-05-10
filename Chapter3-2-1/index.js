const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');

let window = null;

ipcMain.on('data', (event, data) => {
  try {
    store.set('cache-data',data);
    window.webContents.send('data-res', 'success');
  } catch (error) {
    window.webContents.send('data-res', 'fail');
  }
})

function createWindow() {

  window = new electron.BrowserWindow({
    width: 600,
    height: 400,
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
  if(!window){
    window = createWindow();
  }
})