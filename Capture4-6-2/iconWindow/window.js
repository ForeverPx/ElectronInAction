const { ipcRenderer } = require("electron");

$(function(){
  const iconElem = $('#icon');

  function onIconClick(){
    ipcRenderer.send('toggleBar');
  }

  iconElem.click(onIconClick);
});