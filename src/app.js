const electron = require('electron');

const { app, BrowserWindow} = require('electron');



app.on('ready', function(){
  let startWin = new BrowserWindow({width:500, height:120, transparent:true, frame:false, center:true, webPreferences:{nodeIntegration:true}});
  startWin.loadFile('./start.html');

  //erstellt ein neues fenster
  let win = new BrowserWindow({
    width: 1200,
    height: 600,
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