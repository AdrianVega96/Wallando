const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");

const getOrdersByUser = async (req, res, next) => {
  const uid = req.params.uid;
  if (uid !== req.userData.userId) {
    const error = new Error("No tiene acceso a los pedidos de este usuario");
    error.code = 401;
    return next(error);
  }
  let orders;
  try {
    orders = await Order.find({ usuario: uid });
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!orders || orders.length === 0) {
    const error = new Error("No se ha podido encontrar pedidos");
    error.code = 404;
    return next(error);
  }
  res.json({
    orders,
  });
};

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error de validación. Compruebe sus datos");
    error.code = 422;
    return next(error);
  }
  const newOrder = new Order(req.body);
  if (req.body.usuario !== req.userData.userId) {
    const error = new Error("No puede crear un pedido para otro usuario");
    error.code = 401;
    return next(error);
  }
  let user;
  try {
    user = await User.findById(req.body.usuario);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!user) {
    const error = new Error("No se ha podido encontrar a ese usuario");
    error.code = 404;
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user.pedidos.push(newOrder);
    await user.save({ session: sess });
    await newOrder.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("No se ha podido crear el nuevo pedido");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "Pedido creado" });
};

const deleteOrder = async (req, res, next) => {
  const oid = req.params.oid;
  let order;
  try {
    order = await Order.findById(oid).populate("usuario");
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!order) {
    const error = new Error("No se ha podido encontrar ese pedido");
    error.code = 404;
    return next(error);
  }
  if (req.userData.userId !== order.usuario._id.toString()) {
    const error = new Error("No está autorizado para eliminar este pedido");
    error.code = 401;
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    order.usuario.pedidos.pull(oid);
    await order.usuario.save({ session: sess });
    await order.remove({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("No se ha podido eliminar el pedido");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "El pedido ha sido eliminado" });
};

exports.getOrdersByUser = getOrdersByUser;
exports.createOrder = createOrder;
exports.deleteOrder = deleteOrder;
