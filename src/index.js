const fs = require('fs');

const save = fs.readFileSync(JSON.stringify(`${__dirname}/save.json`).toString());


constructor();

function addItem(){
    const item = document.getElementById('txt-inp').value;
    if(item){
        save.push(item);
        localStorage.setItem("list", save);
        constructor();
    }
}

function constructor(){
    document.getElementById('list').innerHTML = "";
    save.forEach(e, i => {
        fs.writeFileSync(`${__dirname}/save.json`, JSON.parse(save));
        
        document.getElementById('list').innerHTML += `<li>${e}</li>`;
    });
}