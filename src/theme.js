import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#054f49',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#c5c5c5',
    },
  },
});

export default theme;
