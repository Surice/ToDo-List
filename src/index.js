const fs = require('fs');

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));

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
function cAll(){
    save = [];
    fs.writeFileSync(`${__dirname}/save.json`, JSON.stringify(save));
    constructor();
}

function minWin(){
    window.resizeTo(0,0);
    window.blur();
    window.addEventListener("focus", function(event){ 
        window.resizeTo(config.width, config.height);
    }, false);
}
async function fullWin(){
    if(window.innerHeight != screen.height && window.innerWidth != screen.width){
        window.resizeTo(screen.width, screen.height);
    }else{
        await window.resizeTo(config.width, config.height);

        const x = screen.width/2-(window.outerWidth/2);
        const y = screen.height/2-(window.outerHeight/2);
        
        window.moveTo(x, y);
    }
}