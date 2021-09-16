const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const routeUsers = require("./routes/route-users");
const routeProducts = require("./routes/route-products");
const routeOrders = require("./routes/route-orders");

app.use("/shop/users", routeUsers);
app.use("/shop/products", routeProducts);
app.use("/shop/orders", routeOrders);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Ha ocurrido un error desconocido",
  });
});

mongoose
  .connect(
    "mongodb+srv://admin:s9PJLreCekWTSnew@cluster0.femte.mongodb.net/Wallando?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => app.listen(5000, () => console.log("Escuchando...")))
  .catch((error) => console.log(error));
