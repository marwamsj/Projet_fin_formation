const express = require("express");
const router = express.Router();
const adminCont = require("../controllers/admin.js/admin");
const {
  validateRegister,
  validateLogin,
  validation,
} = require("../middleware/auth");

//@method POST
//@desc POST a admin
// @PATH  http://localhost:5000/api/admin/register
// @Params  Body
// register
router.post("/register", adminCont.register);

//@method POST
//@desc POST  a admin
// @PATH  http://localhost:5000/api/admin/login
// @Params  Body
// login
router.post("/login", adminCont.login);

//@method POST
//@desc POST  logout admin
// @PATH  http://localhost:5000/api/admin/logout
// logout
router.post("/logout", adminCont.logout);

module.exports = router;
