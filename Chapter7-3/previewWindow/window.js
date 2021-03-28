const fs = require('fs');
const { desktopCapturer, remote, ipcRenderer } = window.require('electron');
const dialog = remote.dialog;
const win = remote.getCurrentWindow();
let audioContext = new AudioContext();
let recorder = null;
let blob = [];

ipcRenderer.on('begin-record', () => {
  startRecording();
});

ipcRenderer.on('stop-record', () => {
  stopRecording();
});

function startRecording() {
  navigator.getUserMedia({
    audio: true
  }, function (stream) {
    console.log('success');
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.ondataavailable = event => {
      blob = new Blob([event.data], {
        type: 'audio/mp3',
      });
      previewMedia(blob);
    };
    recorder.onerror = err => {
      console.error(err);
    };
  }, function (e) {
    __log('No live audio input: ' + e);
  });
}

function stopRecording() {
  recorder.stop();
}

function saveMedia(blob, path) {
  let reader = new FileReader();
  reader.onload = () => {
    let buffer = new Buffer(reader.result);
    fs.writeFile(`${path}/audio.mp3`, buffer, {}, (err, res) => {
      if (err) return console.error(err);
    });
  };
  reader.onerror = err => console.error(err);
  reader.readAsArrayBuffer(blob);
}

function previewMedia(blob){
  document.getElementById('preview').src = URL.createObjectURL(blob);
}


const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function () {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  }).then(result => {
    if (result.canceled === false) {
      saveMedia(blob, result.filePaths[0]);
    }
  }).catch(err => {
    console.log(err)
  })
});

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', function () {
  win.hide();
  document.getElementById('preview').src = '';
});