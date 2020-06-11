const electron = require('electron');
const fs = require('fs');

const { app, BrowserWindow} = require('electron');
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`));



app.on('ready', function(){
  let startWin = new BrowserWindow({width:256, height:256, transparent: true, frame:false, center:true, icon: `./icon.png`,webPreferences:{nodeIntegration:true}});
  startWin.loadFile('./start.html');

  //erstellt ein neues fenster
  let win = new BrowserWindow({
    width: config.width,
    height: config.height,
    show: false,
    title: "ToDo-List",
    center: true,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    icon: `./icon.png`,
      
    webPreferences: {
      nodeIntegration: true
    }
  });
  //läd in das fenster die gebaute html
  win.loadFile('./main.html');

  win.on('ready-to-show', ()=>{
    console.log("ready!");
    startWin.close();
    win.show();
  });

});