
const remote = require('electron').remote;
const win = remote.getCurrentWindow();
$(function(){
  const HIDDEN = 0;
  const AMIMATING = 1;
  const SHOWED = 2;
  let staus = SHOWED;
  const iconElem = $('#icon');
  const barElem = $('#bar');

  function onIconClick(){
    if(staus === SHOWED){
      barElem.animate({
        top: '600px',
        height: '100px'
      },'fast', function(){
        staus = HIDDEN;
        $('.container').css({
          top: '600px',
          height: '100px'
        })
      })
      staus = AMIMATING;
    }else if(staus === HIDDEN){
      $('.container').css({
        top: '0px',
        height: '700px'
      })
      iconElem.css({
        bottom: '0px',
        top: 'auto'
      })
      barElem.animate({
        top: '0px',
        height: '700px'
      },'fast', function(){
        staus = SHOWED
        
      })
      staus = AMIMATING;
    }
  }

  iconElem.click(onIconClick);
  $('.container').mouseenter(function(event){
    if(win.isFocused()){
      console.log(event);
      win.setIgnoreMouseEvents(false,)
    }
    // win.setIgnoreMouseEvents(false,)
    
  });
  $('.container').mouseleave(function(event){
    if(win.isFocused()){
      console.log(event);
      win.setIgnoreMouseEvents(true, { forward: true })
    }
    // win.setIgnoreMouseEvents(true, { forward: true })
  });
});