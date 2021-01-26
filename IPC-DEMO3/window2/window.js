const { ipcRenderer } = require("electron");

ipcRenderer.send('getRegistedMessage', 'action');

ipcRenderer.on('registedMessage', function(event, data){
    try {
       let webContentIds = JSON.parse(data);
       for(let i=0; i<webContentIds.length;i++){
        ipcRenderer.sendTo(webContentIds[i], 'action', 'eat')
       }
    } catch (error) {
        console.log(error)
    }
})
