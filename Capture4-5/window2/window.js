const os = require('os');

function getFreemem() {
  return `${convert(os.freemem())}G`;
}

function getTotalmem(){
  return `${convert(os.totalmem())}G`;
}

function convert(bytes) {
  return (bytes/1024/1024/1024).toFixed(2)
}

document.querySelector('#platform span').innerHTML = os.platform();
document.querySelector('#freemem span').innerHTML = getFreemem();
document.querySelector('#totalmem span').innerHTML = getTotalmem();