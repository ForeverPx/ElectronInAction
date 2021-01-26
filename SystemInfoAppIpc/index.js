const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron')

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('2222222222222222') // prints "ping"
})

const os = require('os');
function getCpu() {
  const cpus = os.cpus();
  console.log(cpus)
  if (cpus.length > 0) {
    return cpus[0].model
  } else {
    return '';
  }
}

function getFreemem() {
  return `${convert(os.freemem())}G`;
}

function getTotalmem(){
  return `${convert(os.totalmem())}G`;
}

function convert(bytes) {
  return (bytes/1024/1024/1024).toFixed(2)
}


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


  function createWindow() {

    window = new electron.BrowserWindow({
      width: 600,
      height: 400
    })

    const urls = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'index.html')
    })


    window.loadURL(urls)
    console.log(urls);

    window.on('close', function(){
      window = null;
    })
  }

  app.on('window-all-closed', function () {
    app.quit();
  })

  app.on('ready', function () {
    createWindow()
  })
}else{
  app.quit();
}
