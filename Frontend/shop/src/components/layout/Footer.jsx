import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div id="enlaces-redes-sociales">
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div id="informacion-contacto">
        <p>Calle Las Huesas s/n</p>
        <p>35000 - Las Palmas de Gran Canaria</p>
        <p>España</p>
        <p>000 00 00 00</p>
      </div>
      <div id="enlace-contacto">
        <p>Contáctanos</p>
      </div>
    </div>
  );
};

export default Footer;
