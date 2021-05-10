const http = require('http');
const { ipcRenderer } = require("electron");
const  Store  = require("electron").remote.require('electron-store');
console.log(Store)

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/api/user',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const req = http.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    try {
      //通过ipc将数据发送给主进程
      ipcRenderer.send('data',JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }   
  });
})

ipcRenderer.on('data-res', function(event, data){
  console.log('收到回复：', data)
});

req.write('');
req.end();