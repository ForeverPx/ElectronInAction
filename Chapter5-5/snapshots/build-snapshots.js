const vm = require('vm')
const path = require('path')
const fs = require('fs')
const electronLink = require('electron-link')
const rootPath = path.resolve(__dirname, '..');
const shouldExcludeModule = {};

async function build() {

  const result = await electronLink({
    baseDirPath: `${rootPath}`,
    mainPath: `${rootPath}/snapshots/snapshots.js`,
    cachePath: `${rootPath}/snapshots/cache`,
    shouldExcludeModule: (modulePath) => shouldExcludeModule.hasOwnProperty(modulePath)
  })

  const snapshotScriptPath = `${rootPath}/snapshots/cache/snapshots.js`
  fs.writeFileSync(snapshotScriptPath, result.snapshotScript)

  // 确认该脚本文件是否能生成snapshot
  vm.runInNewContext(result.snapshotScript, undefined, { filename: snapshotScriptPath, displayErrors: true })
}

module.exports = build;