const { ipcRenderer,remote} = require("../../Capture5-5/node_modules/electron");
const HIDDEN = 0;
const AMIMATING = 1;
const SHOWED = 2;
let status= SHOWED;
const barElem = $('#bar');
const curWin = remote.getCurrentWindow();

ipcRenderer.on('toggleBar', function(event){  
  if(status=== SHOWED){
    barElem.animate({
      top: '600px',
      height: '100px'
    },'fast', function(){
      status= HIDDEN;
      const position = curWin.getPosition();
      curWin.setSize(100,100);
      curWin.setPosition(position[0],position[1]+600);
    })
    status= AMIMATING;
  }else if(status=== HIDDEN){
    const position = curWin.getPosition();
    curWin.setSize(100,700);
    curWin.setPosition(position[0],position[1]-600);
    barElem.animate({
      top: '0px',
      height: '700px'
    },'fast', function(){
      status= SHOWED
      
    })
    status= AMIMATING;
  }
})
