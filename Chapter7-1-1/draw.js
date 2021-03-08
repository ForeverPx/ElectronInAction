const canvas = document.getElementById('screen-shot');
const ctx = canvas.getContext('2d');

function draw(){
    canvas.onmousedown = function(ev){
        var ev = ev || window.event;
        ctx.beginPath();
        ctx.moveTo(ev.screenX-canvas.offsetLeft,ev.screenY-canvas.offsetTop);
        document.onmousemove = function(ev){
            var ev = ev || window.event;
            ctx.strokeStyle = 'red';
            ctx.lineTo(ev.screenX-canvas.offsetLeft,ev.screenY-canvas.offsetTop);
            ctx.stroke();
        };  
    };
    document.onmouseup = function(){
        document.onmousemove = null;
        document.onload = null;   
    };
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);  
}

module.exports = {
    draw,
    clearCanvas
};