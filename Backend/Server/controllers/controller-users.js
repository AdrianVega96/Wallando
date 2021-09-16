const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password").populate("pedidos");
  } catch (error) {
    const err = new Error("No se ha podido acceder a los datos");
    err.code = 500;
    return next(err);
  }
  if (!users || users.length === 0) {
    const error = new Error("No se ha podido encontrar usuarios");
    error.code = 404;
    return next(error);
  }
  res.json({ users });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "Error de validación. Compruebe los datos introducidos"
    );
    error.code = 422;
    return next(error);
  }
  const { nombre, email, password } = req.body;
  let userExists;
  try {
    userExists = await User.findOne({
      email: email,
    });
  } catch (error) {
    const err = new Error("Ha habido un problema en la operación");
    err.code = 500;
    return next(err);
  }
  if (userExists) {
    const error = new Error("Ya existe un usuario con ese e-mail");
    error.code = 401;
    return next(error);
  } else {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      const err = new Error(
        "No se ha podido crear el usuario. Inténtelo de nuevo"
      );
      err.code = 500;
      return next(err);
    }
    const newUser = new User({
      nombre: nombre,
      email: email,
      password: hashedPassword,
    });
    try {
      await newUser.save();
    } catch (error) {
      const err = new Error("No se han podido guardar los datos");
      err.code = 500;
      return next(err);
    }
    let token;
    try {
      token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        "clave-segura-token",
        {
          expiresIn: "1h",
        }
      );
    } catch (error) {
      const err = new Error("El proceso de alta ha fallado");
      err.code = 500;
      return next(err);
    }
    res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      token: token,
    });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let userExists;
  try {
    userExists = await User.findOne({
      email: email,
    });
  } catch (error) {
    const err = new Error(
      "No se ha podido realizar la operación. Pruebe más tarde"
    );
    err.code = 500;
    return next(err);
  }
  if (!userExists) {
    const error = new Error(
      "No se ha podido identificar al usuario. Credenciales erróneos"
    );
    error.code = 422;
    return next(error);
  }
  let validatedPassword = false;
  try {
    validatedPassword = await bcrypt.compare(password, userExists.password);
  } catch (error) {
    const err = new Error(
      "No se ha realizar el login. Revise sus credenciales"
    );
    err.code = 500;
    return next(err);
  }
  if (!validatedPassword) {
    const error = new Error(
      "No se ha podido identificar al usuario. Credenciales erróneos"
    );
    error.code = 401; // 401: Fallo de autenticación
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: userExists.id,
        email: userExists.email,
      },
      "clave-segura-token",
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    const err = new Error("El proceso de login ha fallado");
    err.code = 500;
    return next(err);
  }
  res.json({
    userId: userExists.id,
    email: userExists.email,
    token: token,
  });
};

const deleteUser = async (req, res, next) => {
  const oid = req.params.uid;
  let user;
  try {
    user = await User.findById(oid).populate("pedidos");
  } catch (err) {
    const error = new Error("No se ha podido acceder a los datos");
    error.code = 500;
    return next(error);
  }
  if (!user) {
    const error = new Error("No se ha podido encontrar ese usuario");
    error.code = 404;
    return next(error);
  }
  if (req.userData.userId !== user._id) {
    const error = new Error("No está autorizado para eliminar este usuario");
    error.code = 401;
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    user.pedidos.foreach((pedido) => {
      pedido.remove({ session: sess });
    });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("No se ha podido eliminar el usuario");
    error.code = 500;
    return next(error);
  }
  res.json({ message: "El usuario ha sido eliminado" });
};

// const patchUserPassword = async (req, res, next) => {}
// const patchUserName = async (req, res, next) => {}
// const patchUserAdress = async (req, res, next) => {}
// const patchUserPostalCode = async (req, res, next) => {}
// const patchUserCredit = async (req, res, next) => {}
// const deleteUser = async (req, res, next) => {}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
