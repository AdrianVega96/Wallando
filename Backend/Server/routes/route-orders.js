const express = require("express");
const controller = require("../controllers/controller-orders");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// Check authorization
router.use(checkAuth);

// CRUD operations
router.get("/user/:uid", controller.getOrdersByUser);

router.post("/", controller.createOrder);

router.delete("/:oid", controller.deleteOrder);

// No hay updates porque no considero posible la posibilidad de modificar un pedido que esta en proceso de entrega. Se debe cancelar (borrar) el pedido para no ser entregado y hacer uno nuevo.

module.exports = router;
