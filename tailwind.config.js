const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,react}'],
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    groupLevel: 10,
    groupScope: 'scope',
    groupVariants: ['hover', 'focus'],

    screens: {
      dashboard: '1410px',
      ...defaultTheme.screens,
    },

    extend: {
      borderRadius: {
        card: '10px',
        '2.5xl': '20px',
      },
      transitionProperty: {
        height: 'height',
      },
      rotate: {
        40: '40deg',
      },
      fontSize: {
        '2xs': '0.6875rem',
        '3xs': '0.625rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#14142F',

        'Gray-1': '#0F0D15',
        'Gray-2': '#273240',
        'Gray-3': '#374151',
        'Gray-3-50': 'rgba(55, 65, 81, 0.5)',
        'Gray-4': '#9EA0AA',
        'Gray-5': '#d1d5db',
        'Gray-6': '#7D8490',
        'Gray-7': '#eceef1',
        'Gray-9': '#394150',
        'Gray-8': '#a5a3a9',
        'Gray-11': '#DFE1E6',
        'Gray-12': '#F3F4F6',
        'Gray-14': '#F9F9F9',
        'Gray-16': 'rgba(209, 213, 219, 0.2)',
        'Gray-18': '#fafafa',
        'Gray-20': 'rgba(125, 132, 144, 0.25)',
        'Gray-24': 'rgba(192, 191, 223, 0.1)',
        'Gray-28': '#e5e7eb',

        'cyan-1': '#0891b2',

        'Green-1': '#4A944E',
        'Green-2': '#13b9b9',
        'Green-3': 'rgba(19, 185, 185, 0.3)',
        'Green-4': '#10B981',
        'Green-8': '#D1FAE5',
        'Green-12': '#D7F3D8',
        'Green-400': '#34D399',
        'Green-800': '#065F46',

        'Accent-1': '#3363FF',
        'Accent-2': '#6565FB',
        'Accent-3': '#DEE6FF',
        'Accent-4': '#9797FC',
        'Accent-5': '#E0E7FF',
        'Accent-6': '#818CF8',
        'Accent-7': '#3730A3',
        'Accent-8': '#F3F3FC',

        LightBG: '#F9FAFB',
        Highlight: '#DDFF55',

        'Neutral-Light': '#42526E',
        'Neutral-4': '#797D6F',
        'Neutral-5': '#8D9183',
        'Neutral-10': '#ECEEE4',

        'team-color': '#0891B2',
        'vendor-color': '#F3AA20',

        'yellow-1': '#FEF3C7',
        'yellow-2': '#FBBF24',
        'yellow-3': '#92400E',

        'orange-1': '#f3aa20',

        'purple-4': '#6D28D9',
        'purple-5': '#7A3FEB',
        'purple-6': '#8B5CF6',
        'purple-7': '#C4B5FD',
        'purple-8': '#EDE9FE',
        'purple-9': '#F5F3FF',
        'purple-10': '#F2F2F8',
        'purple-11': '#F3F3F7',
        'purple-12': '#F9F9FC',

        'red-1': '#F87171',

        'system-success': '#5DC258',
        'system-alert': '#FF5F68',
        'blue-upload': 'rgba(67, 36, 158, 0.44)',
        danger: '#FF5F68',
      },
      spacing: {
        navbar: '56px',
        4.5: '18px',
        18: '72px',
      },
      boxShadow: {
        shadowCard: '0px 3px 5px rgba(9, 30, 66, 0.05), -1px 6px 8px rgba(6, 25, 56, 0.03)',
        dropdown: '0 1px 1px 0 rgba(9, 30, 66, 0.31), 0 3px 5px 0 rgba(9, 30, 66, 0.2)',
        topCategoryHover:
          '-4px 10px 8px 0 rgba(101, 101, 251, 0.03), 0 3px 10px 0 rgba(101, 101, 251, 0.1);',
        propertyDropdown: '0px 3px 5px rgba(9, 30, 66, 0.05), -1px 6px 8px rgba(6, 25, 56, 0.03)',
        targetHover:
          '0px 3px 10px rgba(101, 101, 251, 0.1), -4px 10px 8px rgba(101, 101, 251, 0.03)',
      },
      keyframes: {
        'drawer-enter': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'drawer-leave': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'modal-enter': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'modal-leave': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        'drawer-enter': 'drawer-enter .2s ease-in-out',
        'drawer-leave': 'drawer-leave .2s ease-in-out',
        'modal-enter': 'modal-enter .2s ease-out',
        'modal-leave': 'modal-leave .2s ease-in',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp'), require('tailwindcss-nested-groups')],
};
