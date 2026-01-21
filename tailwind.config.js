/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      sm: '320px',
      md: '375px',
      lg: '768px',
      xl: '1024px',
      '2xl': '1440px',

      mobile: { max: '767px' },
      tablet: { min: '768px', max: '1023px' },
      laptop: { min: '1024px', max: '1439px' },
      desktop: { min: '1440px' },
    },
    extend: {
      colors: {
        red: '#c73b0f',
        'rose-900': '#260F08',
        'rose-500': '#87635A',
        'rose-400': '#AD8A85',
        'myrose-300': '#CAAFA7',
        'rose-100': '#F5EEEC',
        'rose-50': '#FCF8F6',
        green: '#1EA575',
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        redhat: ['Red Hat Text', 'times new roman', 'serif'],
      },
    },
  },
  plugins: [],
};
