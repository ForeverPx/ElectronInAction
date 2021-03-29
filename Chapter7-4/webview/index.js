const { ipcRenderer } = require('electron');

const imgElem = document.getElementById('preview-img');
ipcRenderer.on('imageBase64', (event, data) => {
  imgElem.src = data;
  imgElem.onload = function () {
    ipcRenderer.sendToHost('img-loaded', 1);
  }
})