const bsdiff = require('bsdiff-node');

async function diffAndPatch(preApp, curApp, patchFile, finalApp) {
  await bsdiff.diff(preApp, curApp, patchFile, function (result) {
    console.log('diff:' + String(result).padStart(4) + '%');
  });

  await bsdiff.patch(preApp, finalApp, patchFile, function (result) {
    console.log('patch:' + String(result).padStart(4) + '%');
  });
}

module.exports = diffAndPatch;