import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__row">
            <NavLink to="/" className="header__text">
              Главная
            </NavLink>
            <NavLink to="/keywords" className="header__text">
              Поиск фильма
            </NavLink>
            <NavLink to="/favorites" className="header__text">
              Избранное
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
