// Chapter10-2/demo1/index.js
const { BaseWindow } = require('sugar-electron');
const url = require('url');
const path = require('path');

const winAUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'winA/index.html')
})

const winA = new BaseWindow('winA', {
  url: winAUrls, 
  width: 800, 
  height: 600
});

const winBUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'winC/index.html')
})

const winB = new BaseWindow('winB', {
  url: winBUrls,
  width: 800, 
  height: 600
});

const winCUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'winB/index.html')
})

const winC = new BaseWindow('winC', {
  url: winCUrls,
  width: 800, 
  height: 600
});

winB.open();
winB.on('ready-to-show', () => {
  winA.open();
});

winB.open();
winC.open();
winA.open();