import React from "react";
import "./Header.css";
import imagen from "./imagenes/logo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  const manageLogin = function () {};
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
        <div>
          <Link to="/login">
            <i className="fas fa-user-circle" onClick={manageLogin}></i>
          </Link>
        </div>
        <div>
          <i className="fas fa-heart"></i>
        </div>
        <div>
          <i className="fas fa-shopping-cart"></i>
          {
            (props.cestaTotal > 0)?<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{props.cestaTotal}</span>: ""
          }
        </div>
      </nav>
    </div>
  );
};

export default Header;
