const fs = require('fs');

var save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`));

constructor();

function addItem(){
    const item = document.getElementById('txt-inp').value;
    document.getElementById('txt-inp').value = "";

    if(item){
        save.push(item);
        console.log(save);
        fs.writeFileSync(`${__dirname}/save.json`, JSON.stringify(save));
        constructor();
    }
}

function constructor(){
    console.log(save);

    document.getElementById('list').innerHTML = "";

    save.forEach(function(e, i){
        document.getElementById('list').innerHTML += `<tr><th>${e}</th><th><button type="button" class="del-btn close" aria-label="Close" onclick="delEl(${i})"><span aria-hidden="true">&times;</span></button></th></tr>`;
    });
}
function delEl(i){
    save.splice(i,1);
    fs.writeFileSync(`${__dirname}/save.json`, JSON.stringify(save));
    constructor();
}