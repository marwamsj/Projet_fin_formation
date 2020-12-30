const express = require("express");
const router = express.Router();
const patientCont = require("../../controllers/Controllers_pateint");
const {
  validateRegister,
  validateLogin,
  validation,
} = require("../../middleware/validator.patient");

//@method POST
//@desc POST a patient
// @PATH  http://localhost:5000/api/patient/register
// @Params  Body
// register
router.post("/register", validateRegister, validation, patientCont.register);

//@method POST
//@desc POST  a patient
// @PATH  http://localhost:5000/api/patient/login
// @Params  Body
// login
router.post("/login", validateLogin, validation, patientCont.login);

//@method GET
//@desc GET  a patient
// @PATH  http://localhost:5000/api/patient/logout
// logout
router.get("/logout", patientCont.logout);

//@method Get
//@desc GET a refreshtoken
// @PATH  http://localhost:5000/api/patient/refreshtoken
// @Params  Body
// refreshtoken
router.get("/refresh_token", patientCont.refreshtoken);

module.exports = router;
