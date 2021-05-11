const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

let parentWin = null;
let childWin = null;

function createWindow(url, parent, position) {
  
  let window = new electron.BrowserWindow({
    width: 600,
    height: 400,
    parent: parent ? parent : null,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

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
  const url1 = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, 'window1/index.html')
  })
  const url2 = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, 'window2/index.html')
  })
  parentWin = createWindow(url1);
  childWin = createWindow(url2, parentWin);
})