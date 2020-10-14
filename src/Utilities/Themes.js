import { createMuiTheme } from '@material-ui/core/styles';

const regularTheme = createMuiTheme({})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

export function findTheme(theme) {
    return theme === 'dark' ? darkTheme : regularTheme
}