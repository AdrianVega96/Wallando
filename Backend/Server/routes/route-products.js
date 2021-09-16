const express = require("express");
const controller = require("../controllers/controller-products");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
// GETs
router.get("/all", controller.getAllProducts);
router.get("/:pid", controller.getAProductByID);

// Check authorization
router.use(checkAuth);

// Rest of CRUD operations (CREATE, UPDATE & DELETE).
router.post(
  "/",
  [
    check("nombre").notEmpty().isString(),
    check("descripcion").notEmpty().isString(),
    check("precioEuros").notEmpty().isNumeric(),
    check("foto").notEmpty().isString(),
    check("categoria").notEmpty().isString(),
    check("topVentas").isBoolean(),
    check("enOferta").isBoolean(),
    check("stock").isNumeric(),
  ],
  controller.createProduct
);

router.delete("/:pid", controller.deleteProduct);

router.patch("/:pid/stock", controller.patchProductStock);
router.patch("/:pid/offer", controller.patchProductOffer);
router.patch("/:pid/top", controller.patchProductTopSold);

module.exports = router;
