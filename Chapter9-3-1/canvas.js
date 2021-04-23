const canvas = document.getElementById('screen-shot');
const ctx = canvas.getContext('2d');
const {remote} = window.require('electron');
const screen = remote.screen;

/**
 * 在canvas中支持鼠标笔迹
 */
function drawCanvas() {
  canvas.onmousedown = function (event) {
    var ev = event || window.event;
    ctx.beginPath();
    ctx.moveTo(ev.screenX, ev.screenY);
    document.onmousemove = function (event) {
      var ev = event || window.event;
      ctx.strokeStyle = 'red';
      ctx.lineTo(ev.screenX, ev.screenY);
      ctx.stroke();
    };
  };
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onload = null;
  };
}

/**
 * 清除canvas
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * 根据屏幕大小将
 */
function resizeCanvas(){
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  const c = document.getElementById("screen-shot");
  c.width = width;
  c.height = height;
}

module.exports = {
  drawCanvas,
  clearCanvas,
  resizeCanvas
};