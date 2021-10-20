const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,react}'
  ],
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#14142F',

        'Gray-1': '#0F0D15',
        'Gray-2': '#273240',
        'Gray-3': '#374151',
        'Gray-4': '#9EA0AA',
        'Gray-6': '#7D8490',
        'Gray-8': '#a5a3a9',
        'Gray-11': '#DFE1E6',
        'Gray-12': '#F3F4F6',
        'Gray-hover': '#F9F9F9',

        'Green-1': '#4A944E',
        'Green-12': '#D7F3D8',

        'Accent-1': '#3363FF',
        'Accent-2': '#6565FB',
        'Accent-3': '#DEE6FF',

        'LightBG': '#F9FAFB',
        'Highlight': '#DDFF55',

        'Neutral-Light': '#42526E',
        'Neutral-4': '#797D6F',
        'Neutral-5': '#8D9183',
        'Neutral-10': '#ECEEE4',

        'purple-4': '#6D28D9',
        'purple-5': '#7A3FEB',
        'purple-6': '#8B5CF6',
        'purple-7': '#C4B5FD',
        'purple-8': '#EDE9FE',
        'purple-9': '#F5F3FF',

        'system-success': '#5DC258',
        'system-alert': '#FF5F68',
        'blue-upload': 'rgba(67, 36, 158, 0.44)',
      },
      spacing: {
        'navbar': '56px',
      }
    },
  },
  variants: {},
  plugins: [],
}
