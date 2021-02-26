var cp = require('child_process');
const console = require('console');
cp.exec("reg query HKEY_CLASSES_ROOT\\sysInfoApp\\shell\\open\\command /ve",
  function(error,stdout,stderr) {
    console.log(error, stdout, stderr);
});