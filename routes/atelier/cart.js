const express = require("express");
const router = express.Router();
const cartCont = require("../../controllers/atelier/cart");

//@POST method
//@desc post a cart atelier
//@path:http://localhost:5000/api/atelier/profile
//@params Body
router.patch("/", cartCont.postCart);

//@GETmethod
//@desc get all Carts
//@path:http://localhost:5000/api/Cart
//router.get("/", cartCont.getCart);

//@GET method
//@desc get one Cart
//@path:http://localhost:5000/api/Cart/:id
//@params Id
//router.get("/:id", cartCont.getCartById);

//@DELETE method
//@desc delete one Cart by id
//@path:http://localhost:5000/api/Cart/:id
//@params Id
//router.delete("/:id", cartCont.deleteCart);

//@PUT method
//@desc update one Cart by id
//@path:http://localhost:5000/api/Cart/:id
//@params Id Body
//router.put("/:id", cartCont.updateCart);

module.exports = router;
