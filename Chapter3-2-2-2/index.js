const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');

ipcMain.on('registMessage', (event, data) => {
  try {
    registMessageChannel(data, event.sender.id);
  } catch (error) {
    console.log(error)
  }
})

ipcMain.on('transMessage', (event, channel, data) => {
  try {
    console.log(getMessageChannel(channel));
    transMessage(getMessageChannel(channel), channel, data);
  } catch (error) {
    console.log(error)
  }
})

const windows = [];

function transMessage(webContentsIds, channel, data){
  for(let i=0; i<webContentsIds.length; i++){
    for(let j=0; j<windows.length; j++){
      if(webContentsIds[i] === windows[j].webContents.id){
        windows[j].webContents.send(channel, data);
      }
    }
  }
}

const messageChannelMap = {};

function registMessageChannel(channel, webContentsId){
  if(messageChannelMap[channel] !== undefined){
    let alreadyHas = false;
    for(let i = 0; i < messageChannelMap[channel].length; i++){
      if(messageChannelMap[channel][i] === webContentsId){
        alreadyHas = true;
      }
    }
    if(!alreadyHas){
      messageChannelMap[channel].push(webContentsId);
    }
  }else{
    messageChannelMap[channel] = [webContentsId];
  }
}

function getMessageChannel(channel){
  return messageChannelMap[channel] || [];
}

function createWindow(url) {
  
  let window = new electron.BrowserWindow({
    width: 600,
    height: 400,
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
  windows.push(createWindow(url1));
  setTimeout(()=>{
    windows.push(createWindow(url2));
  }, 2000)
 
})