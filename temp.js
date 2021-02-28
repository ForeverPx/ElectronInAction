const cp = require('child_process');

function getEasiClassPath(){
  return new Promise(function(resolve, reject){
    cp.exec(`for /f "tokens=3*" %a in  (\'reg query HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Seewo\\EasiClass /v ExePath ^|findstr /ri "ExePath"\') do echo %a %b`, 
    function(err, stdout, stderr){
      if(err || stderr){
        reject(err || stderr);
      }else{
        console.log(stdout.split('\r\n')[2]);
        resolve(err,stdout.split('\r\n')[2]);
      }
    })
  })
}


function regProtocol() {
  return new Promise(function (resolve, reject) {
    cp.exec(`reg add HKEY_CLASSES_ROOT\\sysInfoApp\\shell\\open\\command /ve /t REG_SZ /d "\"C:\\Users\\panxiao\\AppData\\Roaming\\npm\\node_modules\\electron\\dist\\electron.exe\" C:\\Users\\panxiao\\Desktop\\Demos\\ElectronInAction\\Capture5-3\\ \"%1\""`,
      function (err, stdout, stderr) {
        if (err || stderr) {
          reject(err || stderr);
        } else {
          console.log('resolve', stdout.split('\r\n')[2])
          resolve(stdout.split('\r\n')[2]);
        }
      })
  })
}

regProtocol();

module.exports =  getEasiClassPath;