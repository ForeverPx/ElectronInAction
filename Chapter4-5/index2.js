const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

const winsMap = new Map();

function createWindow(windowName, group, htmlPath) {

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
  
  const windowObj = {
    windowName: windowName,
    window: window
  }

  let groupWindows = winsMap.get(group);
  if(groupWindows){
    groupWindows.push(windowObj);
  }else{
    groupWindows = [windowObj];
  }
  winsMap.set(group, groupWindows);
}

function closeWindowByGroup(group){
  const windows = winsMap.get(group);
  if(windows){
    for(let i=0; i<windows.length; i++){
      windows[i].window.close();
    }
  }else{
    console.log(`${group} not existed` );
  }
}

app.on('window-all-closed', function () {
  app.quit();
})

app.on('ready', function () {
  createWindow('window1', 'group1', path.join(__dirname, './window1/index.html'));
  createWindow('window2', 'group2', path.join(__dirname, './window2/index.html'));
  createWindow('window3', 'group2', path.join(__dirname, './window2/index.html'));

  setTimeout(function(){
    closeWindowByGroup('group2');
  }, 3000)
})