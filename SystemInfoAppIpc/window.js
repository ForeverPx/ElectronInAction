import { ipcRenderer } from 'electron'
ipcRenderer.send('asynchronous-message', '')