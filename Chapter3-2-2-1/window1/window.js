const { ipcRenderer } = require("electron");

ipcRenderer.send('registMessage', 'action');

ipcRenderer.on('action', function(event, data){
    document.body.innerHTML = data;
})