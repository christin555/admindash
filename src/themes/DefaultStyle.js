import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {defaultPalette} from './defaultPalette';

const DefaultStyle = (props) => {
  const {children} = props;

  const defaultTheme = createMuiTheme({
    palette: defaultPalette,
    typography: {
      'fontFamily': `"Roboto", "Arial", sans-serif`,
      'fontSize': 16,
      'fontWeightLight': 300,
      'fontWeightRegular': 400,
      'fontWeightMedium': 500,
      'body1': {
        'fontSize': 16,
        fontWeight: 300
      }
    }
  });

  return (
    <MuiThemeProvider theme={defaultTheme}>
      {children}
    </MuiThemeProvider>
  );
};

DefaultStyle.propTypes = {
  children: PropTypes.node,
  colors: PropTypes.object
};

export default DefaultStyle;
