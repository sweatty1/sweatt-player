// This is for running electron version of the application
const {app, BrowserWindow} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
if (isDev) {
    require('electron-reload');
}

function createWindow() {
    // create the browser window
    mainWin = new BrowserWindow({webPreferences: { nodeIntegration: true }}); // add frame: false no outline
    mainWin.maximize();
    if(isDev) {
        mainWin.webContents.openDevTools(); // load dev tools only for deveopment environment
    }

    mainWin.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    )
}

app.on('ready', createWindow);