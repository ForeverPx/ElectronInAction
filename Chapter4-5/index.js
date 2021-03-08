const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

const winsMap = new Map();

function createWindow(windowName, htmlPath) {

  let window = new electron.BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true
    }
  })

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
  createWindow('window1', path.join(__dirname, './window1/index.html'));
  createWindow('window2', path.join(__dirname, './window2/index.html'));

  setTimeout(function(){
    closeWindowByName('window2');
  }, 3000)

  // setTimeout(function(){
  //   closeAllWindows();
  // }, 3000)
})