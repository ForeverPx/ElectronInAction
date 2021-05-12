const path = require('path');
const fs = require('fs');
const childProcess = require('child_process')
const rootPath = path.resolve(__dirname, '..');
const snapshotScriptPath = `${rootPath}/snapshots/cache/snapshots.js`
const distPath = `${rootPath}/snapshots/dist`;
const snapshotBlob = path.join(`${distPath}/`, 'v8_context_snapshot.bin')

function mkSnapshots(){
  childProcess.execFileSync(
    path.resolve(__dirname, '..', 'node_modules', '.bin',
      'mksnapshot' + (process.platform === 'win32' ? '.cmd' : '')
    ),
    [snapshotScriptPath, '--output_dir', distPath]
  )

  //将v8_context_snapshot.bin拷贝到Electron可以加载的目录
  // const pathToElectron = path.resolve(
  //   __dirname,
  //   '..',
  //   'node_modules',
  //   'electron',
  //   'dist'
  // )
  const pathToElectron = path.resolve(
    __dirname,
    '..',
    'node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources'
  )
  fs.copyFileSync(snapshotBlob, path.join(pathToElectron, 'v8_context_snapshot.bin'))
}

module.exports = mkSnapshots;
