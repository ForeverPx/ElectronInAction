const md5 = require('./fileDiff');
const path = require('path');
const app = path.join('./asar/app.asar');
const app101 = path.join('./asar/app101.asar');

md5.compareFile(app, app101).then(function(result){
  console.log(result ? '、文件相同':'文件不相同');
}).catch(function(err){
  console.log(err);
});

const contentDiff = require('./contentDiff');
const path = require('path');
const app = path.join('./asar/app.asar');
const app101 = path.join('./asar/app101.asar');
const patchFile = path.join('./dist/app100-101.patch');
const finalApp = path.join('./dist/app.asar');

contentDiff(app, app101, patchFile, finalApp);