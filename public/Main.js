// This is for running electron version of the application
const {app, BrowserWindow} = require('electron');

const path = require('path')

function createWindow() {
    // create the browser window
    win = new BrowserWindow({width: 800, height: 600});
    // win = new BrowserWindow({width: 800, height: 600, frame: false}); // causes no chrome file,view, exit header and outline bars
    // and load the index.html of the app
    win.webContents.openDevTools(); // load dev tools only for deveopment environment
    // win.loadFile('index.html'); // will load the html page
    // win.loadURL('http://localhost:3000/') // will load what is being displayed to localhost:3000
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
}

app.on('ready', createWindow);