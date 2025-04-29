import {TextField} from '@mui/material';
import React from 'react';
import Select from '../../shared/Select';
import MediaBlock from './MediaBlock';

const VideoDropWithType = (props) => {
  const {value, onChange} = props;
  let video = value;

  if (Array.isArray(value)) {
    video = value[0];
  }

  let block = {};

  if (video?.type === 'vk') {
    block = (
      <TextField
        variant='standard'
        maxLength={255}
        value={video?.src}
        onChange={({target: {value: newValue}}) => onChange({value: {type: 'vk', src: newValue}})}
        helperText={'VK id'}
      />
    );
  } else {
    block = <MediaBlock {...props} />;
  }

  return (
    <React.Fragment>
      <Select
        isMulti={false}
        options={[
          {value: 'video', label: 'Video Загрузка'},
          {value: 'vk', label: 'из ВК'}
        ]}
        value={video?.type || 'video'}
        onChange={({value: newValue}) => onChange({value: {type: newValue, src: ''}})}
      />
      {block}
    </React.Fragment>
  );
};

export default VideoDropWithType;