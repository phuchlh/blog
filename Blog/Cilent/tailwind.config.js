module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '80%': '80%',

      },
      width: {
        '7/10': '70%',
        'xl': '120%'
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '100': 'repeat(1,100px minmax(0, 1fr) 0)',

        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      borderRadius: {
        '50': '50%',

      },
      textColor: {
        'view': 'rgba(0, 0, 0, 0.75)',
        'tim': '#FF33F7',
        'xanh': '#3481C8',
        'xam': '#242526',
        '600': '#718096',
        '700': '#4A5568',
        'xanhla': "#6F7B4D",
        'xanhnhat': "#9AA57D",
        
      },
      spacing: {
        '30': '30px',
        '400': '425px',
        '570': '570px',
        '600': '37rem',
        '550': '40rem',
        '650': '38rem',
        '1000': '60rem',
        '-10': '-5px',
        '250': '250px',
        '902': '902px',
        '101': '101px',
        '1190': '1190px',
        '1450': '1450px',
        '153': '153px',
        '60': '60px',
        '50': '50px',
        '230': '236px',
        '320': '320px',
        '450': '450px',
        '56': '56px',
        '55': '55px',
        '140': '136px',
        '222': '220px',
        '3000': '2px',
        '76': '76px',
        '621': '525px',
        '34': '34px',
        '85': '92px',
        '10': '10px',
        '40px': '40px',
        '1069': '2px',
      },
      lineHeight: {
        'extra-loose': '2.5',
        '56': '56px',
        '80': '80px',
        '60': '60px',
        '36': '144px',

      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'fpt': '#F2E9E4',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'table': '#E2E8F0',
        'layoutforadmin': '#F7F7F4',
        'bluementor': '#36C5F0',
        'xanhla': "#6F7B4D",
        'xanhnhat': "#9AA57D",
        'xanhlot': "#4FD1C5",
        'xam': '#f0f2f5',
      }),
      zIndex: {
        '-1': '-1',
      },
      gridTemplateColumns: {
        // Simple 16 column grid

        // Complex site-specific column configuration
        'footer': '500px minmax(auto, 1fr) 0px ',
      },
      borderColor: theme => ({
        ...theme('colors'),
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'cam': '#FD7B38',
        'xanhla': "#6F7B4D",
        'layoutforadmin': '#F7F7F4',
        'xanhnhat': "#9AA57D",
      }),
      borderRadius: {
        '5xl': '8rem'
      },
      maxWidth: {
        '100': '220px',
        '1/2': '50%',
        '3/4': '75%',

      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
