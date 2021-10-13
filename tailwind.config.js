const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,react}'
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'Gray-1': '#0F0D15',
        'Gray-2': '#273240',
        'Gray-3': '#9EA0AA',
        'Gray-6': '#7D8490',
        'Gray-8': '#a5a3a9',
        'Gray-12': '#F3F3F7',

        'Green-1': '#4A944E',
        'Green-12': '#D7F3D8',

        'Accent-1': '#3363FF',
        'Accent-2': '#6565FB',
        'Accent-3': '#DEE6FF',

        'LightBG': 'rgba(192, 191, 223, 0.1)',
        'Highlight': '#DDFF55',

        'Neutral-Light': '#42526E',
        'Neutral-4': '#797D6F',
        'Neutral-5': '#8D9183',
        'Neutral-10': '#ECEEE4',

        'dept-1': '#254252',
        'dept-2': '#14213D',
        'dept-3': '#1F1A44',
        'dept-4': '#2451BF',
        'dept-5': '#4F46E5',
        'dept-6': '#202898',
        'dept-7': '#853BFF',
        'dept-8': '#6B23DC',
        'dept-9': '#43249E',
        'dept-10': '#13B9B9',
        'dept-11': '#0891B2',
        'dept-12': '#066B64',
        'dept-13': '#F3AA20',
        'dept-14': '#DF6622',
        'dept-15': '#F64C32',
      },
    },
  },
  variants: {},
  plugins: [],
}
