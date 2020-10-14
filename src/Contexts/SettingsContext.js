import { createContext } from 'react'
import { loadSettings, saveSettings } from '../Utilities/SettingsManager'

//suppose to be able to give default values but never works for me
export const SettingsContext = createContext();

const BaseSettingsState = {
  currentTheme: 'regular',
  rootMusicFolder: 'No folder'
};

export function setupSettings() {
  let settingState = loadSettings();
  if(settingState === null) {
    saveSettings(BaseSettingsState, 'wx');
    return BaseSettingsState;
  } else {
    return settingState;
  }
}

export function toggleTheme(event) {
  let settings = this.state.settings;
  settings.currentTheme = event.target.checked ? 'dark' : 'regular';
  this.setState({settings});
  saveSettings(settings);
}

export function setRootFolder(folder) {
  let settings = this.state.settings;
  settings.rootMusicFolder = folder;
  this.setState({settings});
  saveSettings(settings);
}

export function clearRootFolder() {
  let settings = this.state.settings;
  settings.rootMusicFolder = 'No folder';
  this.setState({settings});
  saveSettings(settings);
}