import React from 'react';
import PropTypes from 'prop-types';
import {defaultPalette} from './defaultPalette';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const DefaultStyle = (props) => {
  const {children} = props;

  const defaultTheme = createTheme({
    palette: defaultPalette,
    typography: {
      'fontFamily': `"Roboto", "Arial", sans-serif`,
      'fontSize': 14,
      'fontWeightLight': 300,
      'fontWeightRegular': 400,
      'fontWeightMedium': 400,
      'body1': {
        'fontSize': 14,
        fontWeight: 400
      }
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
};

DefaultStyle.propTypes = {
  children: PropTypes.node,
  colors: PropTypes.object
};

export default DefaultStyle;
