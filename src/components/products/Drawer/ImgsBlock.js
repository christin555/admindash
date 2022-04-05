import React from 'react';
import {inject} from 'mobx-react';
import s from './style.module.scss';
import Box from "@mui/material/Box";
import {toJS} from "mobx";
import Dropzone from 'react-dropzone';
import Button from "../../../shared/Button";
import PublishIcon from '@material-ui/icons/Publish';
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

@inject(({DrawerStore}) => {
    return {
        product: toJS(DrawerStore.product),
        loadFiled: DrawerStore.loadFiled,
        setMainPhoto: DrawerStore.setMainPhoto,
        deletePhoto: DrawerStore.deletePhoto,
        mode: DrawerStore.mode,
    };
})
class DrawerStore extends React.Component {

    get isShow() {
        return this.props.mode !== 'show'
    }
    get blocks() {
        const {
            product,
            setMainPhoto,
            deletePhoto
        } = this.props;

        return product.imgs?.map(({src, isMain}) => {
                const _src = 'https://master-pola.com' + src;
                return <div
                    key={src}
                    style={{position: 'relative'}}>
                    <IconButton
                        size={'small'}
                        className={s.delBut}
                        onClick={() => deletePhoto(src)}>
                        {this.isShow ? <CloseIcon/> : null}
                    </IconButton>

                    <div className={s.imgBlock}>
                        <img src={_src}/>
                    </div>
                    <Box display={'flex'} flexDirection={'column'}>
                        {
                            isMain ? <span className={s.main}> Главная </span> :
                               this.isShow ?
                                    <Button className={s.buttmain} size={'small'} onClick={() => setMainPhoto(src)}>
                                        Сделать главной
                                    </Button> : null
                        }
                    </Box>
                </div>
            }
        );
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
                    Фотографии
                </Typography>
                <div className={s.imgsContainer}>
                    {this.blocks}
                </div>

                {
                    this.isShow ? <Dropzone onDrop={loadFiled}>
                        {({getRootProps, getInputProps}) => (
                            <React.Fragment>
                                <Button
                                    color="primary"
                                    startIcon={<PublishIcon/>}
                                    variant="contained"
                                    className={s.upButton}
                                    {...getRootProps()}>
                                    Загрузить фотографию
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
