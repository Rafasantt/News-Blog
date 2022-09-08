module.exports = {
  content: [
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        gray: {
          100: '#dad7cd',
          200: '#f1faee',
          500: '#fbf7e4',
          600: '#d3c3aa',
          700: 'rgba(0, 0, 0, 0.5)',
          800: 'rgba(0, 0, 0, 0.3)',
        },
        green: {
          100: '#a3b18a',
          200: '#588157',
          300: '#344e41',
        },
        blue: {
          100: '#a8dadc',
          200: '#457b9d',
          300: '#1d3557',
          400: '#1976d2',
        },
      },
      screens: {
        'lg': {'max': '1024px'},
        'mg': {'max': '600px'},
      },
    },
  },
  plugins: [],
}

