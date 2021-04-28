const result = parseInt(window.localStorage.getItem('result')) || 0;

function add(){
  result = reuslt + 1;
  window.localStorage.setItem('result', result)
}

setInterval(()=>{
  add();
}, 2000);

setTimeout(()=>{
  process.crash();
}, 10000)