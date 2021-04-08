const log4js = require('log4js');
const path = require('path');
// const fs = require('fs');
const app = require('electron').app || require('electron').remote.app;
const mkdirp = require('mkdirp');
const logPath = path.join(app.getPath('appData'), 'ScreenShot', 'logs');
console.log(logPath);
const pattern = '[%d{yyyy-MM-dd hh:mm:ss.200}][%p]%m%n';

mkdirp.sync(logPath);

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

const logger = log4js.getLogger('ScreenShot');

module.exports = logger;