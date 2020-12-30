const express = require("express");
const router = express.Router();
const atelierCont = require("../../controllers/atelier/auth");
const {
  validateRegister,
  validateLogin,
  validation,
} = require("../../middleware/validator.atelier");

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
//router.post("/login", validateLogin, validation, atelierCont.login);

//@method GET
//@desc GET  a atelier
// @PATH  http://localhost:5000/api/atelier/logout
// logout
//router.get("/logout", atelierCont.logout);

//@method Get
//@desc GET a refreshtoken
// @PATH  http://localhost:5000/api/atelier/refreshtoken
// @Params  Body
// refreshtoken
router.get("/refresh_token", atelierCont.refreshtoken);

module.exports = router;
