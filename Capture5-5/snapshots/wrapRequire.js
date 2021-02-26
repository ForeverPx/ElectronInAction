if (snapshotResult) {
  const path = require('path')
  const Module = require('module')

  const rootPath = process.cwd();
  console.log(rootPath)

  Module.prototype.require = function (module) {
    const absoluteFilePath = Module._resolveFilename(module, this, false)
    let modulePath = path.relative(rootPath, absoluteFilePath)
    if (!modulePath.startsWith('./')) {
      modulePath = `./${modulePath}`
    }
    modulePath = modulePath.replace(/\\/g, '/');

    // 判断snapshots中是否有该模块
    let cachedModule = snapshotResult.customRequire.cache[modulePath]

    if (!cachedModule) {
      // 该模块在snapshots中不存在，走正常的require流程
      return Module._load(module, this, false);
    }else{
      // 该模块在snapshots中存在，直接将
      return cachedModule.exports;
    }
  }
}
