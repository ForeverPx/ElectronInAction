const fs = require('fs');
const md5 = require('md5');

function compareFile(preApp, curApp) {
  return new Promise(function (resolve, reject) {
    fs.readFile(preApp, function (err, buf) {
      if(err){
        reject(err);
        return;
      }
      const appMD5 = md5(buf);
      console.log('当前版本asar的MD5值：', appMD5);
      fs.readFile(curApp, function (err, buf) {
        if(err){
          reject(err);
          return;
        }
        const app101MD5 = md5(buf);
        console.log('新版本asar的MD5值：', app101MD5);
        if(appMD5 === app101MD5){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  });
}

module.exports = {
  compareFile
};