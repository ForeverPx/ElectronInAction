const {getEasiClassPath, regProtocol} = require('./reg');
const { shell } = require('electron')

document.querySelector('#open-app').addEventListener('click', function(){
    getEasiClassPath().then(function(result){
        console.log(result);
        shell.openPath(result);
    })
});

document.querySelector('#reg-protocol').addEventListener('click', function(){
    regProtocol().then(function(result){
        alert('添加成功，可以通过 sysInfoApp://params 打开应用')
    })
});