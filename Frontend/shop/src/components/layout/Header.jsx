import React from "react";
import "./Header.css";
import imagen from "./imagenes/logo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  const isLogged = props.isLogged;
  const userData = props.userData;
  return (
    <div className="Header">
      <div id="logo-empresa">
        <Link to="/home">
          <img src={imagen} alt="Logo de Wallando" id="logo" />
        </Link>
      </div>
      <div id="nombre-empresa">
        <h1>Wallando</h1>
      </div>
      <nav className="nav-principal">
        {isLogged ? <p>{userData.email}</p> : null}
        <div>
          {!isLogged ? (
            <Link to="/login">
              <i className="fas fa-user-circle"></i>
            </Link>
          ) : (
            <Link to="/profile">
              <i className="fas fa-user-circle"></i>
            </Link>
          )}
        </div>
        <div>
          <i className="fas fa-heart"></i>
        </div>
        <div>
          <i className="fas fa-shopping-cart"></i>
        </div>
      </nav>
    </div>
  );
};

export default Header;
