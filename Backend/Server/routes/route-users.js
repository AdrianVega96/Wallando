const express = require("express");
const controller = require("../controllers/controller-users");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/all", controller.getAllUsers);
router.post(
  "/register",
  [
    check("nombre").notEmpty().isString(),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty().isString(),
  ],
  controller.createUser
);
router.post(
  "/login",
  [
    check("email").notEmpty().isEmail(),
    check("password").notEmpty().isString(),
  ],
  controller.loginUser
);

router.use(checkAuth);

router.delete("/:uid");

// router.patch("/:uid/password");
// router.patch("/:uid/name");
// router.patch("/:uid/adress");
// router.patch("/:uid/postal");
// router.patch("/:uid/credit");

module.exports = router;
