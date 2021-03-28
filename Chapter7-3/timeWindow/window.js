const { remote, ipcRenderer } = window.require('electron');
const win = remote.getCurrentWindow();
const timeElement = document.getElementById('time');

let timeCounter = 0;
let interval = null;

/**
 * 格式化时间
 */
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

ipcRenderer.on('begin-record', () => {
  interval = setInterval(() => {
    timeCounter = timeCounter + 1;
    let timestr = formatTime();
    timeElement.innerHTML = timestr;
  }, 1000);

  getAudioInfoAndDraw();
})

ipcRenderer.on('stop-record', () => {
  clearInterval(interval);
  timeCounter = 0;
  timeElement.innerHTML = '00:00';
  canvas.clearRect(0, 0, cWidth, cHeight);
  window.cancelAnimationFrame(requestAnimationFrameId);
})


const audioContext = new window.AudioContext();
let gainNode, audioInput, analyserNode = null;
function getAudioInfoAndDraw() {
  navigator.getUserMedia({ audio: true }, function (stream) {
    gainNode = audioContext.createGain();
    audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(gainNode);
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    gainNode.connect(analyserNode);
    initCanvasInfo();
    // 绘制canvas图像
    canvasFrame();
  }, function (e) {
    console.log(e);
  });
}

let canvas = null;
let cWidth = 0; //canvas宽度
let cHeight = 0; //canvas高度
let requestAnimationFrameId = null;
function initCanvasInfo() {
  const canvasElem = document.getElementById("graph");
  cWidth = canvasElem.width;
  cHeight = canvasElem.height;
  canvas = canvasElem.getContext('2d');
}

function canvasFrame() {
  var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(freqByteData);
  console.log(freqByteData.length, freqByteData[0], analyserNode.frequencyBinCount);
  canvas.clearRect(0, 0, cWidth, cHeight);
  canvas.fillRect(100, cHeight, 100, -freqByteData[0]);
  requestAnimationFrameId = window.requestAnimationFrame(canvasFrame);
}