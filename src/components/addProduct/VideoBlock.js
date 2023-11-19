import React from 'react';
import {inject} from 'mobx-react';
import s from '../listComponetns/Drawer/style.module.scss';
import Box from "@mui/material/Box";
import {toJS} from "mobx";
import Dropzone from 'react-dropzone';
import Button from "../../shared/Button";
import PublishIcon from '@mui/icons-material/Publish';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

@inject(({DrawerStore}) => {

    return {
        product: toJS(DrawerStore.card) || {},
        loadFiled: DrawerStore.loadFiled,
        deleteVideo: DrawerStore.deleteVideo,
        mode: DrawerStore.mode
    };
})
class DrawerStore extends React.Component {

    get isShow() {
        return this.props.mode !== 'show';
    }

    get blocks() {
        const {
            product,
            setMainPhoto,
            deleteVideo
        } = this.props;

        return product.video?.map(({src}) => {
                const _src = 'https://master-pola.com' + src;
                return <div
                    key={src}
                    style={{position: 'relative'}}>
                    <IconButton
                        size={'small'}
                        className={s.delBut}
                        onClick={() => deleteVideo(src)}>
                        {this.isShow ? <CloseIcon/> : null}
                    </IconButton>

                    <div className={s.imgBlock}>
                        <video src={_src}/>
                    </div>
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
                <div className={s.imgsContainer}>
                    {this.blocks}
                </div>

                {
                    this.isShow ? <Dropzone onDrop={(files) => loadFiled(files, 'video')}>
                        {({getRootProps, getInputProps}) => (
                            <React.Fragment>
                                <Button
                                    color="primary"
                                    startIcon={<PublishIcon/>}
                                    variant="contained"
                                    className={s.upButton}
                                    {...getRootProps()}>
                                    Загрузить видео
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
