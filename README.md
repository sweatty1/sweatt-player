
# Sweatt-Player

Electron React js application created for fun and practice.

# Scripts
Main scripts for development

### `npm run react-start`
Runs the application in development mode generating builds on changes but not displaying in the browser

### `npm run electron-start`
Runs a nodemon (a node demon) which watches for changes in the build from react-start process and relauches the electron application

### `npm run preelectron-pack` && `react-build`
Creates a build folder with the application.

### `npm run electron-pack`
Runs electron-builder creating a dist folder containing an executable based off the build folder. electron-builder runs preelectron-pack to insure the build is up to date.

### `npm start old-electron-start`
Runs an instance of the current build in the build folder

# Development Prep
Development is done inside of an instance of electron (chromium render engine and node runtime).\
As we need the ability to access folders and files (music folder\files) on the machine via node fs and browsers prevents this for safety.

1. Install packages with npm or yarn.
2. Edit `node_modules\strtok3\lib\FsPromise.js` and `node_modules\music-metadata\lib\common\RandomFileReader.js`\
Changing `require("fs");` to `window.require("fs")`\
window being the instance of electron's node allowing the modules to have proper fs access otherwise the app will crash when music folder reader occurs.
3. Start the react builder with react-start and then start the nodemon with electron-start.

Normally for development you will have the processes react-start and electron-start running.\
Any save will rebuild the app and relauch an instance of electron.\
Sadly this doens't work all the time. This live reload is working as a mirror for the `'http://localhost:3000'` which means our electron is simply a mirror of the web versions.\
This becomes a problem when trying to play any of our music.

To work around this we have to change in the `public\main.js`
```
isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
```
to
```
`file://${path.join(__dirname, '../build/index.html')}`
```
So now we use the dist file for electron by default.\
Althought this means that after any changes one would need to run 
`npm run react-build`
then
`npm run old-electron-start`


