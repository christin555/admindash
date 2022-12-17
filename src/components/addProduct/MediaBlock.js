import React from 'react';
import {inject} from 'mobx-react';
import s from '../listComponetns/Drawer/style.module.scss';
import Box from "@mui/material/Box";
import Dropzone from 'react-dropzone';
import Button from "../../shared/Button";
import PublishIcon from '@material-ui/icons/Publish';
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

@inject(({DrawerStore}) => {
    return {
        loadFiled: DrawerStore.loadFiled,
        mode: DrawerStore.mode
    };
})

class DrawerStore extends React.Component {
    get isShow() {
        return this.props.mode !== 'show'
    }

    deletePhoto = (src) => this.props.onChange({value: this.props.value?.filter((_src) => src !== _src)});

    handlerDrop = async (files) => {
        const uploaded = await this.props.loadFiled(files, this.props.isMulti);
        const oldValues = this.props.value || [];


        if (this.props.isMulti) {
            this.props.onChange({value: oldValues.concat(uploaded)});
        } else this.props.onChange({value: uploaded});
    }

    get blocks() {
        const {value: _value, isMulti} = this.props;

        if (!_value) {
            return null
        }

        if (isMulti) {
            return _value?.map((src) => {
                    const _src = 'https://master-pola.com' + src;
                    return <div
                        key={src}
                        style={{position: 'relative'}}>
                        <IconButton
                            size={'small'}
                            className={s.delBut}
                            onClick={() => this.deletePhoto(src)}>
                            {this.isShow ? <CloseIcon/> : null}
                        </IconButton>

                        <div className={s.imgBlock}>
                            <img src={_src}/>
                        </div>
                    </div>
                }
            );
        }

        const src = _value.includes('https') ? _value : 'https://master-pola.com' + _value;
        const isVideo = src.includes('MOV');

        return <div
            key={src}
            style={{position: 'relative'}}>
            <div className={s.imgBlock}>
                {isVideo && <video src={src}/> || <img src={src}/>}
            </div>
        </div>
    }

    render() {
        const {loadFiled} = this.props;

        return (
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
            >
                <Typography
                    variant={'button'}
                    style={{marginBottom: '10px', color: '#454545', fontWeight: '400', display: 'flex'}}>
                    Медиа
                </Typography>
                <div className={s.imgsContainer}>
                    {this.blocks}
                </div>

                {
                    this.isShow ? <Dropzone onDrop={this.handlerDrop}>
                        {({getRootProps, getInputProps}) => (
                            <React.Fragment>
                                <Button
                                    color="primary"
                                    startIcon={<PublishIcon/>}
                                    variant="contained"
                                    className={s.upButton}
                                    {...getRootProps()}>
                                    Загрузить
                                    <input {...getInputProps()} />
                                </Button>
                            </React.Fragment>
                        )}
                    </Dropzone> : null
                }
            </Box>
        );
    }

}

export default DrawerStore;
