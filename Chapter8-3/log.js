const log4js = require('log4js');
const path = require('path');
const app = require('electron').app || require('electron').remote.app;
const fs = require('fs');
const mkdirp = require('mkdirp');
const request = require('request');

const logPath = path.join(app.getPath('appData'), 'ScreenShot', 'logs');
mkdirp.sync(logPath);

const pattern = '[%d{yyyy-MM-dd hh:mm:ss.200}][%p]%m%n';
log4js.configure({
  appenders: {
    out: { type: 'stdout', layout: { type: 'pattern', pattern } },
    app: {
      type: 'dateFile',
      filename: path.join(logPath, 'ScreenShot.log'),
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd',
      daysToKeep: 7,
      layout: { type: 'pattern', pattern }
    }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'info' }
  }
});

const logger = log4js.getLogger();

logger.reportFile = function () {
  try{
    const files = fs.readdirSync(logPath);
    let newest = {
      filePath: '',
      fileName: '',
      createTime: 0
    };
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const filePath = path.join(logPath, files[i]);
        let stats = fs.statSync(filePath);
        const createTime = +new Date(stats.birthtime);
        if (createTime > newest.createTime) {
          newest.createTime = createTime;
          newest.filePath = filePath;
          newest.fileName = files[i];
        }
      }
      const formData = {
        file: fs.createReadStream(newest.filePath),
        filename: newest.fileName
      };
      request({
        url: 'http://127.0.0.1:3000/api/logs',
        headers: {
          'Content-Type': 'multipart/form-data',
          'User-Id': '123'
        },
        method: 'POST',
        formData: formData
      }, function (error, response, body) {
        console.log('[reportFile]', error, body);
      });
    }
  }catch(e){
    console.log(e)
  }
}

module.exports = logger;