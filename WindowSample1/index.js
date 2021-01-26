const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

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
      height: 400,
      minWidth: 600,
      maxWidth: 800,
      minHeight: 400,
      maxHeight: 600,
      resizable: true,
      movable: true,
      x:0,
      y:0,
      title: 'Param Title',
      icon: path.join(__dirname, 'logo.ico')
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
    setTimeout(()=>{
      window.setTitle('ChangeByFunc')
    }, 3000);
  })
}else{
  app.quit();
}
