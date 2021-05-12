const os = require('os');

require('./snapshots/wrapRequire');
snapshotResult.setGlobals(
  global,
  process,
  window,
  document,
  console,
  global.require
)
const snap = require('./snapshots/snapshots.js');

function getCpu() {
  const cpus = os.cpus();
  console.log(cpus)
  if (cpus.length > 0) {
    return cpus[0].model
  } else {
    return '';
  }
}

function getFreemem() {
  return `${convert(os.freemem())}G`;
}

function getTotalmem(){
  return `${convert(os.totalmem())}G`;
}

function convert(bytes) {
  return (bytes/1024/1024/1024).toFixed(2)
}

document.querySelector('#snapshots span').innerHTML = snap();
document.querySelector('#cpu-arch span').innerHTML = os.arch();
document.querySelector('#cpu span').innerHTML = getCpu();
document.querySelector('#platform span').innerHTML = os.platform();
document.querySelector('#freemem span').innerHTML = getFreemem();
document.querySelector('#totalmem span').innerHTML = getTotalmem();