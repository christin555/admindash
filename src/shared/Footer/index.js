import React from 'react';
import s from './Footer.module.scss';
import LogoBlock from './LogoBlock';
import Links from './Links';
import DefaultStyle from '../../themes/DefaultStyle';
import Copy from './CopyBlock';
import Contacts from './Contacts';
import FooterAbout from './About';

const Footer = () => (
  <DefaultStyle>
    <FooterAbout />
    <div className={s.footer}>
      <div className={s.content}>
        <LogoBlock />
        <Links />
        <Contacts />
      </div>
      <span className={s.policy}>
          Политика конфиденциальности
        <br />
           © Мастер Пола, 2021
      </span>
      <Copy />
    </div>
  </DefaultStyle>
);

export default Footer;
