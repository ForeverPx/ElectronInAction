const { desktopCapturer, remote, ipcRenderer} = window.require('electron');
const dialog = remote.dialog
const screen = remote.screen;
const win = remote.getCurrentWindow();
const fs = require('fs')
const {
  drawCanvas,
  clearCanvas,
  resizeCanvas
} = require('./canvas');

resizeCanvas();
drawCanvas();

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

    const img = new Image();
    img.src = imageBase64;
    img.onload = function () {
      const c = document.getElementById("screen-shot");
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      win.show();
    }
  } catch (e) {
    console.log(e);
  }
}

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', function(){
  win.hide();
  clearCanvas();
})  

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function(){
  // dialog.showOpenDialog(win, {
  //   properties: ["openDirectory"]
  // }).then(result => {
  //   if (result.canceled === false) {
  //       console.log("Selected file paths:")
  //       console.log(result.filePaths)
  //       fs.writeFileSync(`${result.filePaths[0]}/screenshot.png`, nativeImage.toPNG());
  //   }
  // }).catch(err => {
  //   console.log(err)
  // })

  fs.writeFileSync(`./screenshot.png`, nativeImage.toPNG());
})  