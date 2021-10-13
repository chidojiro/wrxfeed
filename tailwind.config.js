const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'Gray-1': '#0F0D15',
        'Gray-2': '#273240',
        'Gray-3': '#9EA0AA',
        'Gray-8': '#a5a3a9',
        'Gray-12': '#F3F3F7',

        'black-1': '#14142F',

        'Green-1': '#4A944E',
        'Green-12': '#D7F3D8',

        'Accent-1': '#3363FF',
        'Accent-2': '#6565FB',
        'Accent-3': '#DEE6FF',

        'LightBG': '#F6F7F3',
        'Highlight': '#DDFF55',

        'Neutral-Light': '#42526E',
        'Neutral-4': '#797D6F',
        'Neutral-5': '#8D9183',
        'Neutral-10': '#ECEEE4',
      },
    },
  },
  variants: {},
  plugins: [],
}
