const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!products || products.length === 0) {
    const error = new Error("No se ha podido encontrar productos");
    error.code = 404;
    return next(error);
  }
  res.json({
    products,
  });
};

const getAProductByID = async (req, res, next) => {
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error("No se ha podido encontrar el producto");
    error.code = 404;
    return next(error);
  }
  res.json({
    product,
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error de validación. Compruebe sus datos");
    error.code = 422;
    return next(error);
  }
  // const {
  //   nombre,
  //   descripcion,
  //   precioEuros,
  //   foto,
  //   categoria,
  //   topVentas,
  //   enOferta,
  //   stock,
  // } = req.body;
  const newProduct = new Product(req.body);
  if (req.userData.userId !== "6139ebe158857b3914d703fe") {
    const error = new Error("No tiene permiso para crear producto");
    error.code = 401;
    return next(error);
  }
  try {
    await newProduct.save();
  } catch (err) {
    const error = new Error("No se ha podido crear el nuevo producto");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "Producto creado" });
};

const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error("No se ha podido encontrar ese producto");
    error.code = 404;
    return next(error);
  }
  try {
    await product.remove();
  } catch (err) {
    const error = new Error("No se ha podido eliminar el producto");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "El producto ha sido eliminado" });
};

const patchProductStock = async (req, res, next) => {
  if (req.userData.userId !== "6139ebe158857b3914d703fe") {
    const error = new Error("No tiene permiso para crear producto");
    error.code = 401;
    return next(error);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error de validación. Compruebe sus datos");
    error.code = 422;
    return next(error);
  }
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error("No se ha encontrado el producto");
    error.code = 404;
    return next(error);
  }
  product.stock = req.body.stock;
  try {
    await product.save();
  } catch (err) {
    const error = new Error("No se ha podido modificar el producto");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "Producto modificado" });
};

const patchProductOffer = async (req, res, next) => {
  if (req.userData.userId !== "6139ebe158857b3914d703fe") {
    const error = new Error("No tiene permiso para crear producto");
    error.code = 401;
    return next(error);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error de validación. Compruebe sus datos");
    error.code = 422;
    return next(error);
  }
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error("No se ha encontrado el producto");
    error.code = 404;
    return next(error);
  }
  product.enOferta = req.body.enOferta;
  try {
    await product.save();
  } catch (err) {
    const error = new Error("No se ha podido modificar el producto");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "Producto modificado" });
};

const patchProductTopSold = async (req, res, next) => {
  if (req.userData.userId !== "6139ebe158857b3914d703fe") {
    const error = new Error("No tiene permiso para crear producto");
    error.code = 401;
    return next(error);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Error de validación. Compruebe sus datos");
    error.code = 422;
    return next(error);
  }
  const pid = req.params.pid;
  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!product) {
    const error = new Error("No se ha encontrado el producto");
    error.code = 404;
    return next(error);
  }
  product.topVentas = req.body.topVentas;
  try {
    await product.save();
  } catch (err) {
    const error = new Error("No se ha podido modificar el producto");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "Producto modificado" });
};

exports.getAllProducts = getAllProducts;
exports.getAProductByID = getAProductByID;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.patchProductStock = patchProductStock;
exports.patchProductOffer = patchProductOffer;
exports.patchProductTopSold = patchProductTopSold;
