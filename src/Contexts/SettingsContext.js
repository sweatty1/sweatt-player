import { createContext } from 'react'
import { createMuiTheme } from '@material-ui/core/styles';

//suppose to be able to give default values but never works for me
export const SettingsContext = createContext();

const regularTheme = createMuiTheme({})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

export const BaseSettingsState = {
  currentTheme: regularTheme,
  rootMusicFolder: 'No folder'
};

export function toggleTheme(event) {
  let settings = this.state.settings;
  settings.currentTheme = event.target.checked ? {...darkTheme} : {...regularTheme};
  this.setState({settings});
}

export function setRootFolder(folder) {
  let settings = this.state.settings;
  settings.rootMusicFolder = folder;
  this.setState({settings});
}

export function clearRootFolder() {
  let settings = this.state.settings;
  settings.rootMusicFolder = 'No folder';
  this.setState({settings});
}