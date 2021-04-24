
const { ipcRenderer } = require('electron');

const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
function checkUrl(url){
  const re = new RegExp(reg, 'ig');
  const result = re.test(url);
  return result;
}

function regKey(shortcut, url) {
  try {
    const checkResult = checkUrl(url);
    if(!checkResult){
      alert('URL 格式不正确');
      return;
    }

    const data = JSON.stringify({
      shortcut,
      url
    })
    ipcRenderer.send('registerShortcut', data);
  } catch (e) {
    console.log(e);
  }
}

const input1 = document.getElementById('c-1');
input1.addEventListener('blur', function (e) {
  const inputValue = e.target.value;
  regKey('Ctrl+1', inputValue);
})

const input2 = document.getElementById('c-2');
input2.addEventListener('blur', function (e) {
  const inputValue = e.target.value;
  regKey('Ctrl+2', inputValue);
})

const input3 = document.getElementById('c-3');
input3.addEventListener('blur', function (e) {
  const inputValue = e.target.value;
  regKey('Ctrl+3', inputValue);
})
