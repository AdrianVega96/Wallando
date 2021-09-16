import React from "react";
import "./ListaPedidos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

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
      .then((datos) => console.log(datos.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userData === "") {
      history.push("/");
    }
    getUserOrders();
  }, []);
  return (
    <div className="ListaPedidos">
      {pedidos.map((pedido) => {
        return <Pedido />;
      })}
    </div>
  );
};

const Pedido = (props) => {
  return <div className="Pedido"></div>;
};

export default ListaPedidos;
