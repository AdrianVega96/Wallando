const jwt = require("jsonwebtoken");

const autorizacion = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Autorization: 'bearer TOKEN'
    if (!token) {
      throw new Error("Fallo de autenticación");
    }
    decodedToken = jwt.verify(token, "clave-segura-token");
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    const error = new Error("Fallo de autenticación");
    error.code = 401;
    return next(error);
  }
};

module.exports = autorizacion;
