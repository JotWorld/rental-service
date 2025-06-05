import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo() {
    return(
  <div className="header__logo">
    <Link to={AppRoute.Main} className = "header__logo-link header__logo-link--active">
      <img className = "header__logo" src = "img/logo.svg" alt = "6 cities logo" width = "81" ></img>
    </Link>
  </div>);
}

export default Logo;
