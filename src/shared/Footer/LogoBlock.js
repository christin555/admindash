import React from 'react';
import s from './Footer.module.scss';
import logo from '../../shared/img/logo.png';

const LogoBlock = () => (
  <div className={s.logoBlock}>
    <div className={s.logo}>
      <img src={logo} />
    </div>
    <div className={s.nameLogo}>
      <div className={s.name}>МАСТЕР ПОЛА</div>
      <div>салон напольных покрытий и дверей</div>
    </div>
  </div>

);

export default LogoBlock;
