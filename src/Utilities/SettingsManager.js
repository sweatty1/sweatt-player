const fs = window.require('fs');
// env-paths is a node package that electron uses it
const envPaths = window.require('env-paths');
 
function settingPath() {
    const paths = envPaths('SweattPlayer');
    const settingsLocation =  paths.data + '\\' + 'settings.json';
    return settingsLocation;
}

export function loadSettings() {
    const settingsLocation = settingPath();
    if(fs.existsSync(settingsLocation)) {
        let existingSettings = fs.readFileSync(settingsLocation);
        return JSON.parse(existingSettings);
    } else {
        return null;
    }
}

export function saveSettings(settings, flags = 'w') {
    let settingJsonString = JSON.stringify(settings)
    fs.mkdirSync(envPaths('SweattPlayer').data, { recursive: true });
    fs.writeFileSync(settingPath(), settingJsonString, { flag: flags });
}