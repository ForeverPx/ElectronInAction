const { desktopCapturer,remote, ipcRenderer} = window.require('electron');
const screen = remote.screen;
const win = remote.getCurrentWindow();

ipcRenderer.on('begin-capture', function(event){
  run();
});

async function run(){
  console.log(5666);
  try {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    // const maxDimension = Math.max(screenSize.width, screenSize.height);
    console.log(screenSize);
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

    console.log(entireScreenSource);
  
    console.log(888);
    const image = entireScreenSource.thumbnail
      .resize({
        width: screenSize.width,
        height: screenSize.height
      })
      .toDataURL();
      console.log(image);
    var c=document.getElementById("screen-shot");
    var ctx=c.getContext("2d");
    ctx.drawImage(image,0,0);
  
    win.show();
  
  } catch (e) {
  console.log(e);
  }
}
