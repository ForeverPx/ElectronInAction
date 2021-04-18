const Application = require("spectron").Application;
const chai = require("chai");
const electronPath = require("electron");
const path = require("path");
const fs = require("fs");

chai.should();

describe("SceenShot", function () {
  this.timeout(20000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "../index.js")],
    });
    return this.app.start();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("it should create 1 window after app launch", async function () {
    await this.app.client.waitUntilWindowLoaded();
    const winCount = await this.app.client.getWindowCount();
    winCount.should.equal(1);
  });

  it("it should create neccessary elements in window", async function () {
    await this.app.client.waitUntilWindowLoaded();

    const saveBtnElem = await this.app.client.$("#save-btn");
    const closeBtnElem = await this.app.client.$("#close-btn");
    const canvasElem = await this.app.client.$("#screen-shot");

    const saveBtnElemIsExist = await saveBtnElem.isExisting();
    const closeBtnElemIsExist = await closeBtnElem.isExisting();
    const canvasElemIsExist = await canvasElem.isExisting();

    saveBtnElemIsExist.should.equal(true);
    closeBtnElemIsExist.should.equal(true);
    canvasElemIsExist.should.equal(true);
  });

  it("it should create an screenshot image file in current folder and named screenshot.png", async function () {
    await this.app.client.waitUntilWindowLoaded();
    await this.app.webContents.send("begin-capture");
    const saveBtnElem = await this.app.client.$("#save-btn");
    saveBtnElem.click();
    setTimeout(() => {
      const isFileExist = fs.existsSync("./screenshot.png");
      isFileExist.should.equal(true);
    }, 2000);
  });
});
