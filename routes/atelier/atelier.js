const express = require("express");
const router = express.Router();
const atelierCont = require("../../controllers/atelier/auth");
const {
  validateRegister,
  validateLogin,
  validation,
} = require("../../middleware/validator.patient");

//@method POST
//@desc POST a atelier
// @PATH  http://localhost:5000/api/atelier/register
// @Params  Body
// register
router.post("/register", validateRegister, validation, atelierCont.register);

//@method POST
//@desc POST  a atelier
// @PATH  http://localhost:5000/api/atelier/login
// @Params  Body
// login
router.post("/login", validateLogin, validation, atelierCont.login);

//@method GET
//@desc GET  a atelier
// @PATH  http://localhost:5000/api/atelier/logout
// logout
router.post("/logout", atelierCont.logout);


module.exports = router;
