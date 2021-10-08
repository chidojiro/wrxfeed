import { createTheme } from '@mui/material/styles';
import { Accent, Gray, Highlight, LightBG, System } from '@theme/colors';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    lightBg: Palette['primary'];
    accent: Palette['primary'];
    alert: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
    lightBg?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    alert?: PaletteOptions['primary'];
  }
}

// Update the component's color prop options
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    highlight: true;
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    highlight: true;
    accent: true;
    alert: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
  }
}
declare module '@mui/material/Stack' {
  interface StackPropsColorOverrides {
    lightBg: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: Gray[1],
      light: Gray[2],
      contrastText: '#fff',
    },
    error: {
      main: '#FF5F68',
      contrastText: '#fff',
    },
    text: {
      primary: Gray[1],
      secondary: Gray[2],
    },
    // Custom colors
    highlight: {
      main: Highlight,
      contrastText: Gray[2],
    },
    lightBg: {
      main: LightBG,
      contrastText: Gray[2],
    },
    accent: {
      main: Accent[2],
      contrastText: '#fff',
    },
    alert: {
      main: System.Alert,
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    htmlFontSize: 16,
    fontSize: 16,
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
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
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '0.75rem',
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
        input: {
          padding: '16.5px 24px',
        },
        notchedOutline: {
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: Gray[8],
        },
        root: {
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: Gray[1],
              borderWidth: 1,
            },
          },
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
          borderRadius: 8,
          textTransform: 'none',
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
          borderRadius: 24,
          margin: 24,
          backgroundColor: '#fff',
          padding: 24,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: Gray[8],
          fontSize: '1rem',
          '::before': {
            display: 'none',
          },
          '::after': {
            display: 'none',
          },
          '&.Mui-focused': {
            borderColor: Gray[1],
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: 20,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
  },
});
