const electron = require('electron');
const { BrowserWindow } = require('electron')
const url = require('url');
const path = require('path');

function createWindow(url, options, onClose) {
  if (!url && Object.prototype.toString.call(url) !== '[object String]') {
    return null;
  }
  if (!options && Object.prototype.toString.call(options) !== '[object Object]') {
    return null;
  }

  console.log('121313231',BrowserWindow);
  const window = new electron.BrowserWindow(options);
  window.loadURL(url)

  window.on('close', onClose);

  return window;
}

exports.createWindow = createWindow;