const { remote, ipcRenderer } = window.require('electron');
const win = remote.getCurrentWindow();
const timeElement = document.getElementById('time');

let timeCounter = 0;
let interval = null;

function formatTime() {
  let s = `${parseInt(timeCounter % 60)}`;
  let m = `${parseInt(timeCounter / 60 % 60)}`;
  if (s / 10 < 1) {
    s = `0${s}`;
  }

  if (m / 10 < 1) {
    m = `0${m}`;
  }
  return `${m}:${s}`;
}

ipcRenderer.on('begin-record', function () {
  interval = setInterval(() => {
    timeCounter = timeCounter + 1;
    let timestr = formatTime();
    timeElement.innerHTML = timestr;
  }, 1000);
})

ipcRenderer.on('stop-record', function () {
  clearInterval(interval);
  timeCounter = 0;
  timeElement.innerHTML = '00:00';
})