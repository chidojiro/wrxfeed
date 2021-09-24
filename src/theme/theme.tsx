import { createTheme } from '@mui/material/styles';
import { Accent, Gray, Highlight, LighBG } from '@theme/colors';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
    lightBg: Palette['primary'];
    accent: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
    lightBg?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
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
      main: LighBG,
      contrastText: Gray[2],
    },
    accent: {
      main: Accent[2],
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
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '0.875rem',
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
