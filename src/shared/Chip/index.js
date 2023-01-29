import React from 'react';
import s from './style.module.scss';
import ChipUi from '@mui/material/Chip';
import withStylesUi from '@mui/styles/withStyles';
import {createStyles} from '@mui/styles';
import classNames from 'classnames';

const StyledChip = withStylesUi(({palette}) => createStyles({
  root: {
    borderRadius: 0,
    '&[class*="MuiChip-colorPrimary"]': {
      backgroundColor: palette.gray10010,
      color: palette.black,
      border: 'none'
    }
  },
  deleteIcon: {
    color: palette.gray10040,
    fontSize: '20px'
  }
}))(ChipUi);
const Chip = ({label, variant, color, onDelete, deleteIcon, className}) => (
  <StyledChip
    className={classNames(s.chip, className)}
    color={color}
    variant={variant}
    label={label}
    onDelete={onDelete}
    deleteIcon={deleteIcon}
  />
);

export default Chip;
