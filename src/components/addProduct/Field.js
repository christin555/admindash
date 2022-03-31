import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Select from "../../shared/Select";


const Field = ({name, type, title, values, product, setValue, isRequired}) => {
    const setValueHandler = (value) => setValue(name, value);
    const changeValueHandler= ({target :{value}}) => setValue(name, value);

    let block;

    switch (type) {
        case 'character varying':
            block = <TextField
                variant="standard"
                maxLength={255}
                value={product[name]}
                onChange={changeValueHandler}
            />
            break;
        case 'text':
            block = <TextField
                minRows={2}
                multiline={true}
                value={product[name]}
                onChange={changeValueHandler}
            />;
            break;
        case 'select':
            block = <Select
                options={values}
                value={product[name]}
                onChange={setValueHandler}
            />;
            break;
        case 'integer':
            block =  <TextField
                type="number"
                variant="standard"
                value={product[name]}
                onChange={changeValueHandler}
            />
            break;
        case 'boolean':
            block = <FormControl>
                <RadioGroup row={true} value={product[name]} onChange={changeValueHandler}>
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
            variant={'button'}
                    style={{marginBottom: '10px', color: '#454545', fontWeight: '400', display:'flex'}}>
            {title || name} {isRequired && <Box marginLeft={'10px'} color={'red'}> * </Box> || null}
        </Typography>
        {block}
    </Box>;
}

export default Field;
