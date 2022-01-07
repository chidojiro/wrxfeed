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
        'Gray-5': '#d1d5db',
        'Gray-6': '#7D8490',
        'Gray-8': '#a5a3a9',
        'Gray-11': '#DFE1E6',
        'Gray-12': '#F3F4F6',
        'Gray-14': '#F9F9F9',
        'Gray-16': 'rgba(209, 213, 219, 0.2)',
        'Gray-18': '#fafafa',
        'Gray-20': 'rgba(125, 132, 144, 0.25)',
        'Gray-24': 'rgba(192, 191, 223, 0.1)',
        'Gray-28': '#e5e7eb',

        'Green-1': '#4A944E',
        'Green-2': '#13b9b9',
        'Green-3': 'rgba(19, 185, 185, 0.3)',
        'Green-4': '#10B981',
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
        'purple-10': '#F2F2F8',
        'purple-11': '#F3F3F7',
        'purple-12': '#F9F9FC',

        'system-success': '#5DC258',
        'system-alert': '#FF5F68',
        'blue-upload': 'rgba(67, 36, 158, 0.44)',
      },
      spacing: {
        'navbar': '56px',
      },
      shadow: {

      },
      boxShadow: {
        dropdown: '0 1px 1px 0 rgba(9, 30, 66, 0.31), 0 3px 5px 0 rgba(9, 30, 66, 0.2)',
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
