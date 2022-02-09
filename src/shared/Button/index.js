import React from 'react';
import PropTypes from 'prop-types';
import ButtonUi from '@material-ui/core/Button';
import {createStyles, withStyles} from '@material-ui/core/styles';
import cn from 'classnames';

const StyledButton = withStyles(({palette}) =>
  createStyles({
    root: {
      fontWeight: 400,
      fontSize: '16px',
      height: '40px',
      lineHeight: '24px',
      letterSpacing: '.25px',
      textTransform: 'none',
      boxSizing: 'border-box',
      boxShadow: 'none',
      minWidth: 0,
      '&:hover, &:active': {
        boxShadow: 'none'
      },
      '& [class*="btnLabel"]': {
        width: '100%',
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
        whiteSpace: 'nowrap'
      },
      '&[class*="contained"]': {
        padding: '8px 12px',
        borderRadius: 0,
        color: palette.white
      },
      '&[class*="outlined"]': {
        color: 'black',
        border: `black 1px solid`,
        borderRadius: 0,
        backgroundColor: 'inherit',
        padding: '8px 12px',
        '&[class*="active"]': {
          color: palette.gray500,
          backgroundColor: palette.white
        },
        '&:hover': {
          color: palette.black,
          backgroundColor: palette.white
        }
      }
    }
  }))(ButtonUi);

const Button = (props) => {
  const {
    children,
    variant,
    className,
    ...elementProps
  } = props;
  const classes = cn(variant, className);

  return (
    <StyledButton
      className={classes}
      variant={variant}
      disableElevation={true}
      disableFocusRipple={true}
      {...elementProps}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   Вид кнопки
   */
  variant: PropTypes.oneOf([
    'outlined',
    'dark',
    'contained'
  ]),
  /**
   Обработчик события клика на кнопку
   */
  onClick: PropTypes.func,
  /**
   Класс, который добавится к кнопке
   */
  className: PropTypes.string,
  /**
   * Текст кнопки
   */
  children: PropTypes.node
};

export default Button;