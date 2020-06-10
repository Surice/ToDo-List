const electron = require('electron');

const { app, BrowserWindow, globalShortcut, Notification} = require('electron');

function createWindow () {
  // Erstelle das Browser-Fenster.
  let win = new BrowserWindow({
    width: 1200,
    height: 600,
    title: "ToDo-List",
    fullscreen: false,
    center: true,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    darkTheme: true,
    icon: `${__dirname}/icon.png`,
    
    
    webPreferences: {
      nodeIntegration: true
    }
  })


  // und lade die index.html der App.
  win.loadFile('main.html');
  globalShortcut.register('Esc', () => {
    win.close();
});
}

app.whenReady().then(createWindow);