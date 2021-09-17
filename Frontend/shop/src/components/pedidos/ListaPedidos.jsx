import React from "react";
import "./ListaPedidos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ListaPedidos = (props) => {
  const history = useHistory();
  const userData = props.userData;
  const userToken = props.userToken;
  const [pedidos, setPedidos] = useState([]);

  const getUserOrders = async () => {
    axios
      .get(`http://localhost:5000/shop/orders/user/${userData.userId}`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((datos) => setPedidos(datos.data.orders))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (!recoverData) {
      history.push("/");
    }
    getUserOrders();
  }, [userData]);
  return (
    <div className="ListaPedidos">
      {pedidos.map((pedido) => {
        return <Pedido key={pedido._id} pedido={pedido} />;
      })}
    </div>
  );
};

const Pedido = (props) => {
  return (
    <div className="Pedido">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: "65%", flexShrink: 0 }}>
            ID: {props.pedido._id}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {props.pedido.precioTotal} €
          </Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ListaPedidos;
