const { BaseWindow, store} = require('sugar-electron');
const url = require('url');
const path = require('path');

store.createStore({
  state: {
    name: '我是根store'
  },
  modules: {
    user: {
      state: {
        name: '' 
      }
    }
  }
});

const loginWinUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'loginWin/index.html')
})

const loginWin = new BaseWindow('loginWin', {
  url: loginWinUrls, 
  width: 800, 
  height: 600
});

const personalWinUrls = url.format({
  protocol: 'file',
  pathname: path.join(__dirname, 'personalWin/index.html')
})

const personalWin = new BaseWindow('personalWin', {
  url: personalWinUrls,
  width: 800, 
  height: 600
});

loginWin.open();
loginWin.on('ready-to-show', () => {
  personalWin.open();
});
