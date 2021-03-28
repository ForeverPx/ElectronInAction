const { ipcRenderer } = require('electron');
ipcRenderer.on('imageBase64', (data) => {
  console.log(data);
  ipcRenderer.sendToHost('back', 1);
})