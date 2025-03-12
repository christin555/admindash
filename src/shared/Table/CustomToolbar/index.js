import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import s from "./style.module.scss";

import React from "react";
function CustomToolbar() {
  return (
    <GridToolbarContainer style={{margin: '10px', gap: '10px'}} className={s.toolbar}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport csvOptions={{fileName: 'Экспорт', utf8WithBom: true}} />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;