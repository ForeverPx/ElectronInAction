const { ipcRenderer } = require("electron");

ipcRenderer.send('getRegistedMessage', 'action');

ipcRenderer.on('registedMessage', function(event, data){
    try {
       let webContentIds = JSON.parse(data);
       for(let i=0; i<webContentIds.length;i++){
        ipcRenderer.sendTo(webContentIds[i], 'action', 'Hello World')
       }
    } catch (error) {
        console.log(error)
    }
})
