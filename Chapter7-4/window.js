const { desktopCapturer, remote, ipcRenderer} = window.require('electron');
const dialog = remote.dialog
const screen = remote.screen;
const win = remote.getCurrentWindow();
const fs = require('fs')

const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  if (event.channel === 'img-loaded') {
    win.show();
  }
})

ipcRenderer.on('begin-capture', function (event) {
  run();
});

let nativeImage = null;

async function run() {
  try {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: {
        width: screenSize.width,
        height: screenSize.height
      }
    });

    const entireScreenSource = sources.find(
      source => source.name === 'Entire Screen' || source.name === 'Screen 1'
    );
    nativeImage = entireScreenSource.thumbnail
      .resize({
        width: screenSize.width,
        height: screenSize.height
      });

    const imageBase64 = nativeImage.toDataURL();
    webview.send('imageBase64', imageBase64);
    win.show()
  } catch (e) {
    console.log(e);
  }
}

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', function(){
  win.hide();
})  

const printBtn = document.getElementById('print-btn');
printBtn.addEventListener('click', function(){
  dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  }).then(result => {
    if (result.canceled === false) {
      // webview.printToPDF({})
      // .then(function(data){
      //   fs.writeFileSync(`${result.filePaths[0]}/printScreenshot.pdf`, data);
      // }).catch(function(e){
      //   console.log(`打印失败 ${e}`)
      // });

      webview.print({})
      .then(function(){
        console.log(`打印成功`)
      }).catch(function(e){
        console.log(`打印失败 ${e}`)
      });
    }
  }).catch(err => {
    console.log(err)
  })
})  


// const printBtn = document.getElementById('print-btn');
// printBtn.addEventListener('click', function(){
//   webview.print({})
//   .then(function(){
//     console.log(`打印成功`)
//   }).catch(function(e){
//     console.log(`打印失败 ${e}`)
//   });
// })  

