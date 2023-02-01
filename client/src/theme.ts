import { createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
const Nunito = require('@fontsource/nunito');
const Inter = require('@fontsource/inter');

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    step: 0,
  },
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [Inter, Nunito],
        },
      },
    },
  },
  typography: {
    htmlFontSize: 20,
    fontFamily: 'Inter, Nunito, sans-serif',
    fontWeightRegular: 400,
    //h0-design
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '2.75rem',
      lineHeight: '56px',
      fontWeight: 700,
    },
    //h1-design
    h2: {
      fontSize: '2.25rem',
      lineHeight: '48px',
      fontWeight: 700,
    },
    //h2-design
    h3: {
      fontSize: '1.5rem',
      lineHeight: '32px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '28px',
      fontWeight: 600,
    },
    //smallText-design
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '20px',
    },
    //TAB-design
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '40px',
    },
    //body-design
    body1: {
      fontSize: '1rem',
      lineHeight: '28px',
      fontWeight: 500,
    },
    //button-design
    button: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: '32px',
      textTransform: 'none',
    },
  },
});

export const lightTheme = createTheme(theme, {
  palette: {
    mode: 'light',
    contrastThreshold: 4.5,
    primary: amber,
    secondary: {
      main: '#EC008C',
    },
    divider: amber[200],
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  },
});

export const darkTheme = createTheme(theme, {
  palette: {
    mode: 'dark',
    contrastThreshold: 4.5,
    primary: deepOrange,
    divider: deepOrange[700],
    background: {
      default: deepOrange[900],
      paper: deepOrange[900],
    },
  },
});
