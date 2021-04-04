
const expect = require('chai').expect;
const url = require('url');
const path = require('path');
const { createWindow } = require('../index');

describe('createWindow', function () {
  //用例1
  it('should return Object when params is ok', function () {
    const winUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'timeWindow/index.html')
    })
    expect(Object.prototype.toString.call(createWindow(winUrl, {}, function () { }))).to.be.equal('[object Object]');
  });

  //用例2
  it('should return Null when url param is null', function () {
    expect(Object.prototype.toString.call(createWindow(null, {}, function () { }))).to.be.equal('[object Null]');
  });

  //用例3
  it('should return Null when url param is not a string', function () {
    const winUrl = {};
    expect(Object.prototype.toString.call(createWindow(winUrl, {}, function () { }))).to.be.equal('[object Null]');
  });

  //用例4
  it('should return Null when options param is null', function () {
    const winUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'timeWindow/index.html')
    })
    expect(Object.prototype.toString.call(createWindow(winUrl, null, function () { }))).to.be.equal('[object Null]');
  });

  //用例5
  it('should return Null when options param is not an object', function () {
    const winUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'timeWindow/index.html')
    })
    expect(Object.prototype.toString.call(createWindow(winUrl, "null", function () { }))).to.be.equal('[object Null]');
  });

  //用例6
  it('should return Object and Window is invisible when option’s show config is false', function () {
    const winUrl = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'timeWindow/index.html')
    })
    const window = createWindow(winUrl,  {
      width: 300,
      height: 200,
      show: false, //默认不显示窗口
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    }, function () {});
    expect(Object.prototype.toString.call(window)).to.be.equal('[object Object]');
    expect(window.isVisible()).to.be.equal(false);
  });
})