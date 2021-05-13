const testAddon = require('./build/Release/demo_addon.node');
document.querySelector('#sum-btn').addEventListener('click', function(){
    let number = document.getElementById('number-input').value;
    console
    document.getElementById('result').innerHTML = 'result：' + testAddon.sum(parseInt(number));
});