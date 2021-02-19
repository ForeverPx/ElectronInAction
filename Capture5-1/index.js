const electron = require('electron');
const app = electron.app;
const url = require('url');
const path = require('path');

function getProcessArgv() {
  const argv = {};
  process.argv.forEach(function (item, i) {
      if (i > 1) {
          const res = item.split('=');
          if (res.length === 2) {
              argv[res[0]] = res[1];
          }
      }
  });
  return argv;
}

function getConfig(){
  const argv = getProcessArgv();
  let configName = 'base.config.json';
  switch(argv.env){
    case 'dev':
        configName = 'dev.config.json';
        break;
    case 'test':
        configName = 'test.config.json';
        break;
    case 'prod':
    default:
        configName = 'prod.config.json';
        break;
  }  
  let baseConfig = require(path.join(__dirname, 'config' ,'base.config.json'));
  let curEnvConfig = require(path.join(__dirname, 'config' ,configName));
  return Object.assign(baseConfig, curEnvConfig);
}

function getServerUrlPrefix(){
  const config = getConfig();
  return `${config.serverProto}://${config.serverHost}${config.serverBasePath}`;
}

console.log(getServerUrlPrefix())

app.on('window-all-closed', function () {
  app.quit();
})

app.on('ready', function () {
})