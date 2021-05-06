// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'fournisseurs': 'repeat(5,1fr) repeat(2,25px)',
        'commandes': 'repeat(6,1fr) repeat(2,25px) repeat(1,50px)'
      },
      gridTemplateRows: {
        'maxcontent': 'max-content'
      },
      spacing: {
        '20': '20px',
        '25': '25px',
      },
      inset:{
        '7px': '7px',
        '15px': '15px'
      },
      minWidth:{
        '90': '90px',
        '181': '181px',
        '360' : '360px'
      },
      maxWidth:{
        '280' : '280px',
        '560' : '560px'
      },
      flex:{
        '3' : '3 3 0%'
      },
      screens:{
        'xs' : '480px'
      },
      colors: {
        'gray-300-06':'rgba(209, 213, 219,0.6)'
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      const globalComponents = {
        '.break-line' : {
          "line-break": "anywhere"
        },
        '.h2' : {
          'font-size': 'x-large',
          'font-weight': 600,
          'padding':'10px'
        }
      }
      addComponents(globalComponents)
    })
  ],
}