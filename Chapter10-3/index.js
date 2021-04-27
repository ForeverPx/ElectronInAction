const { BaseWindow } = require('sugar-electron');
const url = require('url');
const path = require('path');

const winAUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'winA/index.html')
})

const winA = new BaseWindow('winA', {
  url: winAUrls,
});

const winBUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'winB/index.html')
})

const winB = new BaseWindow('winB', {
  url: winBUrls
});

winA.open();