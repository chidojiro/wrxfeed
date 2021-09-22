import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0f0d15',
    },
    highlight: {
      main: '#DDFF55',
      contrastText: '#273240',
    },
    error: {
      main: '#FF5F68',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      '"Nunito Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.375rem',
      marginBottom: '1.5625rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.25rem',
    },
    h4: {
      fontSize: '1.0625rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.4375rem',
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
        input: {
          padding: '16.5px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: '4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 24px',
          borderRadius: '24px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          height: '25px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backgroundColor: '#fff',
          padding: '32px',
        },
      },
    },
  },
});
