const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron')

let parentWin = null;
let childWin = null;

ipcMain.on('registMessage', (event, data) => {
  try {
    registMessageChannel(data, event.sender.id);
  } catch (error) {
    console.log(error)
  }
})

ipcMain.on('getRegistedMessage', (event, data) => {
  try {
    event.reply('registedMessage', JSON.stringify(getMessageChannel(data)));
  } catch (error) {
    console.log(error)
  }
})


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

function createWindow(url, parent, position) {
  
  let window = new electron.BrowserWindow({
    width: 600,
    height: 400,
    parent: parent ? parent : null,
    x: position? position.x : null,
    y: position? position.y : null,
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
  childWin = createWindow(url2, parentWin, {x: 100, y: 100});
 
})