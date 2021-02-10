const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');

const winsMap = new Map();

ipcMain.on('toggleBar', (event) => {
  winsMap.get('barWindow').webContents.send('toggleBar');
})

function createWindow(windowName, options, htmlPath) {

  let window = new electron.BrowserWindow(options)

  const urls = url.format({
    protocol: 'file',
    pathname: htmlPath
  })


  window.loadURL(urls)

  window.on('close', function(){
    window = null;
  })

  winsMap.set(windowName, window);
}

function closeWindowByName(windowName){
  const window = winsMap.get(windowName);
  if(window){
    window.close();
  }else{
    console.log(`${windowName} not existed` );
  }
}

function closeAllWindows(){
  winsMap.forEach(function(value){
    value.close();
  })
}

app.on('window-all-closed', function () {
  app.quit();
})

app.on('ready', function () {
  createWindow('barWindow', {
    width: 100,
    height: 700,
    frame: false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  }, path.join(__dirname, './barWindow/index.html'));

  createWindow('iconWindow', 
  {
    width: 100,
    height: 100,
    x: winsMap.get('barWindow').getPosition()[0],
    y: (winsMap.get('barWindow').getPosition()[1] + 600),
    frame: false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  },path.join(__dirname, './iconWindow/index.html'));
  winsMap.get('barWindow').setAlwaysOnTop(true, 'modal-panel');
  winsMap.get('iconWindow').setAlwaysOnTop(true, 'main-menu');
})