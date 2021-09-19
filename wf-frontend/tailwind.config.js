const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        hero: ['MATROSKA'],
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      colors: {
        'white-light': '#F8F7F3',
        black: colors.black,
        white: colors.white,
        tray: '#414141',
        red: '#F13B50',
        yellow: '#FAFF00',
        disabled: '#DFDFDF',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'active'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
  important: true,
};
