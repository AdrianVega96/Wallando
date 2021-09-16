import React from "react";
import "./SideNav.css";
import { useState } from "react";

const SideNav = (props) => {
  const setCategoria = props.setCategoria;
  const categoria = props.categoria;
  const [showPanel, setShowPanel] = useState("collapse-panel");
  const manageCollapsePanel = function () {
    if (showPanel === "collapse-panel") {
      setShowPanel("active");
    } else {
      setShowPanel("collapse-panel");
    }
  };

  return (
    <div className="SideNav">
      <div className="my-accordion">
        <i className="menu fas fa-bars" onClick={manageCollapsePanel}></i>
        <div className={showPanel}>
          <i
            className="tablet fas fa-tablet-alt"
            onClick={() => setCategoria("Tablets")}
          ></i>
          <i
            className="smartwatch bi bi-smartwatch"
            onClick={() => setCategoria("Smartwatchs")}
          ></i>
          <i
            className="laptop fas fa-laptop"
            onClick={() => setCategoria("Ordenadores")}
          ></i>
          <i
            className="headphones fas fa-headphones"
            onClick={() => setCategoria("Accesorios")}
          ></i>
          <i
            className="tv fas fa-tv"
            onClick={() => setCategoria("Televisores")}
          ></i>
        </div>
        {categoria !== "" ? (
            <i className="cancel fas fa-ban" onClick={() => setCategoria("")}></i>
          ) : null}
      </div>
    </div>
  );
};

export default SideNav;
