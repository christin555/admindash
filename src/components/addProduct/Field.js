import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Select from "../../shared/Select";
import MediaBlock from './MediaBlock';
import ImgsBlock from "./ImgsBlock";

const Field = ({name, type, title, adminDesc, values, product, setValue, isRequired, isMulti}) => {
    const setValueHandler = ({value}) => setValue(name, value);
    const changeValueHandler = ({target: {value}}) => setValue(name, value);

    let block;

    switch (type) {
        case 'character varying':
            block = <TextField
                variant="standard"
                maxLength={255}
                value={product[name] || ''}
                onChange={changeValueHandler}
                helperText={adminDesc}
            />
            break;
        case 'text':
            block = <TextField
                minRows={2}
                multiline={true}
                value={product[name] || ''}
                onChange={changeValueHandler}
                helperText={adminDesc}
            />;
            break;
        case 'select':
            block = <Select
                options={values}
                value={product[name]}
                onChange={setValueHandler}
            />;
            break;
        case 'catalogImgs':
            block = <ImgsBlock/>
            break;
        case 'mediaDrop':
            block = <MediaBlock
                value={product[name]}
                onChange={setValueHandler}
                isMulti={isMulti}
            />;
            break;
        case 'integer':
            block = <TextField
                type="number"
                variant="standard"
                value={product[name] || ''}
                onChange={changeValueHandler}
                helperText={adminDesc}
            />
            break;
        case 'boolean':
            block = <FormControl>
                <RadioGroup row={true} value={product[name] || ''} onChange={changeValueHandler}>
                    <FormControlLabel value={"true"} control={<Radio/>} label="Да"/>
                    <FormControlLabel value={"false"} control={<Radio/>} label="Нет"/>
                </RadioGroup>
            </FormControl>
            break;
    }

    return <Box
        display={'flex'}
        flexDirection={'column'}
    >
        <Typography
            style={{marginBottom: '4px', display: 'flex', fontWeight: '300'}}>
            {title || name} {isRequired && <Box marginLeft={'10px'} color={'red'}> * </Box> || null}
        </Typography>
        {block}
    </Box>;
}

export default Field;
