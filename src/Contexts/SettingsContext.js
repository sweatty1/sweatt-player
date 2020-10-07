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
  currentTheme: regularTheme
};

export function toggleTheme(event) {
  let settings = this.state.settings;
  settings.currentTheme = event.target.checked ? {...darkTheme} : {...regularTheme};
  this.setState({settings});
}