const fs = require('fs');
const { desktopCapturer, remote, ipcRenderer } = window.require('electron');
const dialog = remote.dialog;
let recorder = null;
let blob = [];
const win = remote.getCurrentWindow();

ipcRenderer.on('begin-record', () => {
  recorder = null;
  blob = [];
  startRecording();
});

ipcRenderer.on('stop-record', () => {
  stopRecording();
});

function startRecording() {
  try {
    desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Entire Screen') {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720
                }
              }
            })
            createRecorder(stream)
          } catch (e) {
            console.error(e);
          }
          return
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}

function createRecorder(stream) {
  recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.ondataavailable = event => {
    blob = new Blob([event.data], {
      type: 'video/mp4',
    });
    previewMedia(blob);
  };
  recorder.onerror = err => {
    console.error(err);
  };
};

function stopRecording() {
  recorder.stop();
}

function previewMedia(blob) {
  document.getElementById('preview').src = URL.createObjectURL(blob);
}

function saveMedia(blob, path) {
  let reader = new FileReader();
  reader.onload = () => {
    let buffer = new Buffer(reader.result);
    fs.writeFile(`${path}/screen.mp4`, buffer, {}, (err, res) => {
      if (err) return console.error(err);
    });
  };
  reader.onerror = err => console.error(err);
  reader.readAsArrayBuffer(blob);
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