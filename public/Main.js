// This is for running electron version of the application
const {app, BrowserWindow} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
if (isDev) {
    require('electron-reload');
}

function createWindow() {
    // create the browser window
    mainWin = new BrowserWindow({webPreferences: { nodeIntegration: true, enableRemoteModule: true }}); // add frame: false no outline
    mainWin.maximize();
    if(isDev) {
        mainWin.webContents.openDevTools(); // load dev tools only for deveopment environment
    }

    mainWin.loadURL(
        // isDev is only false when ran from .exe from electron-pack
        // isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
        // when needing edit things around playing music uncomment this and use the react-build and old-electron-start scripts
        `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.on('ready', createWindow);