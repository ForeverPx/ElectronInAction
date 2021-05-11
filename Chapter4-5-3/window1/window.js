const os = require('os');

function getCpu() {
  const cpus = os.cpus();
  console.log(cpus)
  if (cpus.length > 0) {
    return cpus[0].model
  } else {
    return '';
  }
}

document.querySelector('#cpu-arch span').innerHTML = os.arch();
document.querySelector('#cpu span').innerHTML = getCpu();