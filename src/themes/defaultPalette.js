import variables from '../shared/_styles.module.scss';

const defaultPalette = {
  primary: {
    light: '#3593b8',
    main: '#3593b8',
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
  secondary: {
    light: '#0a3774',
    main: '#253457',
  }
};

export {
  defaultPalette
};
