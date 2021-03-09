const fs = require('fs');
const electron = require('electron');
const { desktopCapturer, remote, ipcRenderer } = window.require('electron');
const screen = remote.screen;
const recorder;
const blobs = [];
const SECRET_KEY = 'Magnemite';
const { width, height } = screen.getPrimaryDisplay().workAreaSize;

function startRecording() {
  var title = document.title;
  document.title = SECRET_KEY;

  desktopCapturer.getSources({ types: ['window', 'screen'] }, function (error, sources) {
    if (error) throw error;
    for (let i = 0; i < sources.length; i++) {
      let src = sources[i];
      console.log(src.name);
      if (src.name === SECRET_KEY) {
        navigator.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: src.id,
              minWidth: width,
              maxWidth: width,
              minHeight: height,
              maxHeight: height
            }
          }
        }, handleStream, handleUserMediaError);
        return;
      }
    }
  });
}

function handleStream(stream) {
  recorder = new MediaRecorder(stream);
  blobs = [];
  recorder.ondataavailable = function (event) {
    blobs.push(event.data);
  };
  recorder.start();
}

function handleUserMediaError(e) {
  console.error('handleUserMediaError', e);
}

function stopRecording() {
  recorder.stop();
  toArrayBuffer(new Blob(blobs, { type: 'video/webm' }), function (ab) {
    var buffer = toBuffer(ab);
    var file = `./videos/example.webm`;
    fs.writeFile(file, buffer, function (err) {
      if (err) {
        console.error('Failed to save video ' + err);
      } else {
        console.log('Saved video: ' + file);
      }
    });
  });
}

function toArrayBuffer(blob, cb) {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const arrayBuffer = this.result;
    cb(arrayBuffer);
  };
  fileReader.readAsArrayBuffer(blob);
}

function toBuffer(ab) {
  const buffer = new Buffer(ab.byteLength);
  const arr = new Uint8Array(ab);
  for (let i = 0; i < arr.byteLength; i++) {
    buffer[i] = arr[i];
  }
  return buffer;
}