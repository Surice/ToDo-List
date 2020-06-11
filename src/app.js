const electron = require('electron');

const { app, BrowserWindow} = require('electron');

app.on('ready', function(){
    //erstellt ein neues fenster
    let win = new BrowserWindow({
      width: 1200,
      height: 600,
      title: "ToDo-List",
      center: true,
      frame: false,
      transparent: true,
      autoHideMenuBar: true,
      icon: `${__dirname}/icon.png`,
      
      webPreferences: {
        nodeIntegration: true
      }
    });
  
   //läd in das fenster die gebaute html
    win.loadFile('main.html');
});