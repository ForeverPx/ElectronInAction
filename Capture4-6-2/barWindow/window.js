const { ipcRenderer,remote} = require("electron");
const HIDDEN = 0;
const AMIMATING = 1;
const SHOWED = 2;
let staus = SHOWED;
const barElem = $('#bar');
const curWin = remote.getCurrentWindow();

ipcRenderer.on('toggleBar', function(event){  
  if(staus === SHOWED){
    barElem.animate({
      top: '600px',
      height: '100px'
    },'fast', function(){
      staus = HIDDEN;
      const position = curWin.getPosition();
      curWin.setSize(100,100);
      curWin.setPosition(position[0],position[1]+600);
    })
    staus = AMIMATING;
  }else if(staus === HIDDEN){
    const position = curWin.getPosition();
    curWin.setSize(100,700);
    curWin.setPosition(position[0],position[1]-600);
    barElem.animate({
      top: '0px',
      height: '700px'
    },'fast', function(){
      staus = SHOWED
      
    })
    staus = AMIMATING;
  }
})
