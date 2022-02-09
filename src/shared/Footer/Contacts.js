import React from 'react';
import s from './Footer.module.scss';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ViberIcon from '../../shared/Icons/ViberIcon';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Callme from '../Callme';
const Contacts = () => (

  <div className={s.contactsContainer}>
    <div className={s.contacts}>
      <a
        target={'_blank'}
        rel='noopener noreferrer'
        href='tel:89829881522'
        itemProp='telephone'
        className={s.phone}
      >
        8 (982) 988-15-22
      </a>
      <p>
        Задать вопрос, оформить покупку или заказать расчет
      </p>
      <Callme className={s.button} buttonText={'ЗАКАЗАТЬ ЗВОНОК'} />
      <div className={s.messangers}>
        <a
          target={'_blank'}
          rel='noopener noreferrer'
          href='https://www.instagram.com/masterpola72'
          title='Перейти на канал в Instagram'
        >
          <InstagramIcon className={s.icon} />
        </a>
        <a
          className={s.messenger}
          target={'_blank'}
          rel='noopener noreferrer'
          href={`https://wa.me/89829881522`}
        >
          <WhatsAppIcon className={s.icon} />
        </a>
        <a
          className={s.messenger}
          target={'_blank'}
          rel='noopener noreferrer'
          href={`viber://chat?number=%289829881522`}
        >
          <ViberIcon className={s.icon} />
        </a>
        <a
          className={s.messenger}
        >
          <MailOutlineIcon className={s.icon} />
        </a>
      </div>
    </div>
  </div>

);

export default Contacts;
