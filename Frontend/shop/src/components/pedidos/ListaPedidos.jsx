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
import { CardMedia, Card, CardContent } from "@mui/material";
import { Box, width } from "@mui/system";

const ListaPedidos = (props) => {
  const history = useHistory();
  const userData = props.userData;
  const userToken = props.userToken;
  const [pedidos, setPedidos] = useState([]);
  const [noOrders, setNoOrders] = useState(false);

  const getUserOrders = async () => {
    if (userData.userId !== undefined) {
      await axios
        .get(`http://localhost:5000/shop/orders/user/${userData.userId}`, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((datos) => {
          setPedidos(datos.data.orders);
          setNoOrders(false);
        })
        .catch((error) => setNoOrders(true));
    }
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
      {noOrders ? (
        <h2>No hay pedidos</h2>
      ) : (
        pedidos.map((pedido) => {
          return (
            <Pedido key={pedido._id} pedido={pedido} userToken={userToken} />
          );
        })
      )}
    </div>
  );
};

const Pedido = (props) => {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const getOrderedProducts = async () => {
    const productosDelPedido = await Promise.all(
      props.pedido.productos.map((productoPedido) => {
        return axios
          .get(`http://localhost:5000/shop/products/${productoPedido.producto}`)
          .then((datos) => {
            return {
              producto: datos.data.product,
              cantidad: productoPedido.cantidad,
            };
          })
          .catch((error) => console.log(error));
      })
    );
    setOrderedProducts(productosDelPedido);
  };

  const cancelOrder = async () => {
    await axios
      .delete(`http://localhost:5000/shop/orders/${props.pedido._id}`, {
        headers: {
          Authorization: "Bearer " + props.userToken,
        },
      })
      .then((datos) => {
        setOrderedProducts([]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderedProducts();
  }, []);
  return (
    <div className="Pedido">
      {orderedProducts.length !== 0 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              flexDirection: "row",
              flex: "75% 25%",
            }}
          >
            <Typography sx={{ width: "75%" }}>
              ID: {props.pedido._id}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {props.pedido.precioTotal} €
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {orderedProducts.map((product) => {
              return (
                <Card sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {product.producto.nombre}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {product.cantidad} x {product.producto.precioEuros} €
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={product.producto.foto}
                    alt="Foto producto"
                  />
                </Card>
              );
            })}
            <div className="text-center mt-3">
              <button className="btn btn-danger" onClick={cancelOrder}>
                Cancelar
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
};

export default ListaPedidos;
