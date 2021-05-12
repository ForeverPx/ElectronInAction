const buildSnapshots = require('./build-snapshots');
const mkSnapshots = require('./mkSnapshots');

buildSnapshots().then(function(){
  mkSnapshots();
}).catch(function(e){
    console.log('build-snapshots error: ', e);
});

