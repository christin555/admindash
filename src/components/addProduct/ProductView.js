import React from 'react';
import {Typography} from '@mui/material';
import {inject} from 'mobx-react';
import Field from './Field';
import s from './style.module.scss';
import Button from '@mui/material/Button';
import Select from '../../shared/Select';
import Box from '@mui/material/Box';
import 'react-dropzone-uploader/dist/styles.css';

@inject(({ListStore}) => {
  return {
    product: ListStore.product,
    setValue: ListStore.setValue,
    fields: ListStore.fields || [],
    save: ListStore.save,
    categories: ListStore.categories,
    category: ListStore.category,
    setCategory: ListStore.setCategory
  };
})
class PriceView extends React.Component {
  render() {
    const {
      fields,
      setValue,
      product,
      save,
      category,
      setCategory,
      categories
    } = this.props;

    return (
      <Typography variant={'h6'} component={'h1'}>
                    Добавить товар
        <div className={s.fields}>
          <Box
            display={'flex'}
            flexDirection={'column'}
          >
            <Typography
              variant={'button'}
              style={{marginBottom: '10px', color: '#454545', fontWeight: '400', display: 'flex'}}
            >
                                Категория <Box marginLeft={'10px'} color={'red'}> * </Box>
            </Typography>
            <Select
              options={categories}
              value={category}
              onChange={setCategory}
            />
          </Box>

          {fields.map((field) => <Field {...field} key={field.name} setValue={setValue} product={product} />)}
        </div>

        <Box margin={'20px 0 '}>
          <Dropzon
            inputWithFilesContent={'Загрузить еще'}
            styles={{
              dropzone: {
                overflow: 'hidden',
                padding: '10px'
              },
              dropzoneActive: {borderColor: 'green'}
            }}
            inputContent='Загрузить фотографии'
          />
        </Box>

        <Button onClick={save} variant={'contained'}> Сохранить </Button>
      </Typography>
    );
  }
}

export default PriceView;
