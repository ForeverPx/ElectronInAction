const { ipcRenderer } = require("electron");

ipcRenderer.send('transMessage', 'action', 'Hello World Too');
