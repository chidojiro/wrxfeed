// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#296BE3',
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
      fontSize: '1.3125rem',
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
    MuiInput: {
      styleOverrides: {
        underline: {
          '&::before': {
            borderColor: '#BFBFBF',
          },
          '&::after': {
            borderColor: '#BFBFBF',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 24px',
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
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});
