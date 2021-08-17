const express = require("express");
const router = express.Router();
const atelierCont = require("../../controllers/atelier/auth");
const {requireLogin} = require("../../middleware/auth")

//@method get getUser
//@desc GET user
// @PATH  http://localhost:5000/api/user/getprofile

router.get("/getprofile",requireLogin,atelierCont.getUser);


//@method PUT getUser
//@desc put updateprofile
// @PATH  http://localhost:5000/api/user/updateprofile
// 
router.put("/updateprofile",requireLogin,atelierCont.updateUser);

module.exports = router;