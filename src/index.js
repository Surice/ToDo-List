const fs = require('fs');
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));

var save = JSON.parse(fs.readFileSync(`${__dirname}/save.json`));
var trackMouse = true;

//at startup
constructor();
document.getElementById('set').style.height = config.set_height;
document.getElementById('set').style.width = config.set_width;

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
    window.blur();
    window.resizeTo(0,0);
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

function grabDown(){
    console.log("down");
    trackMouse = true;
    trackMouseFun();
}
function grabUp(){
    console.log("up");
    trackMouse = false;
}

function trackMouseFun(){
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        if(event.pageX == null && event.clientX != null){
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        //output of tracking here. Usin `event.pageX` and `event.pageY`
    }
    if(trackMouse){
        window.moveTo(event.pageX, event.pageY+window.innerHeight/2);
        trackMouseFun();
    }
}

function settings(){
    var set = document.getElementById('set');
    if(window.innerHeight == config.mobileH && window.innerWidth == config.mobileW){
        set.style.top = window.innerHeight/2-config.set_mobileH/2;
        set.style.left = window.innerWidth/2-config.set_mobileW/2;
    }else{
        set.style.top = window.innerHeight/2-config.set_height/2;
        set.style.left = window.innerWidth/2-config.set_width/2;
    }
    set.style.display = "block";
}

function size(v){
    if(v == "full"){
        window.resizeTo(config.width, config.height);
        document.getElementById('set').style.height = config.set_height;
        document.getElementById('set').style.width = config.set_width;
    }
    else if(v == "mobile"){
        window.resizeTo(config.mobileW, config.mobileH);
        document.getElementById('set').style.height = config.set_mobileH;
        document.getElementById('set').style.width = config.set_mobileW;
    }
    const x = screen.width/2-(window.outerWidth/2);
    const y = screen.height/2-(window.outerHeight/2);
    window.moveTo(x, y);
    document.getElementById('set').style.display = "none";
}