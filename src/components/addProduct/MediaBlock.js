import React from 'react';
import {inject} from 'mobx-react';
import s from '../listComponetns/Drawer/style.module.scss';
import Box from '@mui/material/Box';
import Dropzone from 'react-dropzone';
import Button from '../../shared/Button';
import PublishIcon from '@mui/icons-material/Publish';
import {IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

@inject(({DrawerStore}) => {
  return {
    loadFiled: DrawerStore.loadFiled,
    mode: DrawerStore.mode
  };
})

class DrawerStore extends React.Component {
  get isShow() {
    return this.props.mode !== 'show';
  }

    deletePhoto = (src) => this.props.onChange({value: this.props.value?.filter((_src) => {
      const localSrc = _src.src ?? _src;

      return src !== localSrc;
    })});

    handlerDrop = async(files) => {
      const uploaded = await this.props.loadFiled(files, this.props.isMulti);
      const oldValues = this.props.value || [];

      if (this.props.isMulti) {
        this.props.onChange({value: oldValues.concat(uploaded)});
      } else {
        this.props.onChange({value: uploaded});
      }
    }

    get blocks() {
      const {value: mediaValue, isMulti} = this.props;

      if (!mediaValue) {
        return null;
      }

      if (isMulti || Array.isArray(mediaValue)) {
        return mediaValue?.map((media) => {
          const src = media?.src ?? media;

          return (
            <div
              key={src}
              style={{position: 'relative'}}
            >
              <IconButton
                size={'small'}
                className={s.delBut}
                onClick={() => this.deletePhoto(src)}
              >
                {this.isShow ? <CloseIcon /> : null}
              </IconButton>

              {this.getMediaBlock(media, src)}
            </div>
          );
        });
      }

      const src = mediaValue?.src ?? mediaValue;

      return (
        <div
          key={src}
          style={{position: 'relative'}}
        >
          <div className={s.imgBlock}>
            {this.getMediaBlock(mediaValue, src)}
          </div>
        </div>
      );
    }

    getMediaBlock(media, src) {
      const isVideo = src.includes('MOV') || src.includes('mp4');
      const readySrc = src.includes('https') ? src : `https://master-pola.com${src}`;

      return (
        <div className={s.imgBlock}>
          {isVideo && <video src={readySrc} /> || <img src={readySrc} />}
        </div>
      );
    }

    render() {
      return (
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'20px'}
        >
          <Typography
            variant={'button'}
            style={{marginBottom: '10px', color: '#454545', fontWeight: '400', display: 'flex'}}
          >
                    Медиа
          </Typography>
          <div className={s.imgsContainer}>
            {this.blocks}
          </div>

          {
            this.isShow ? (
              <Dropzone onDrop={this.handlerDrop}>
                {({getRootProps, getInputProps}) => (
                  <Button
                    color='primary'
                    startIcon={<PublishIcon />}
                    variant='contained'
                    className={s.upButton}
                    {...getRootProps()}
                  >
                                    Загрузить
                    <input {...getInputProps()} />
                  </Button>
                )}
              </Dropzone>
            ) : null
          }
        </Box>
      );
    }

}

export default DrawerStore;
