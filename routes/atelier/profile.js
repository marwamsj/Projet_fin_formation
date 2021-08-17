const express = require("express");
const router = express.Router();
const profileCont = require("../../controllers/atelier/profile");
const {requireLogin,atelieradminMiddleware} = require("../../middleware/auth")
const {commentValidator,validatecart}=require("../../middleware/validator.atelier")

//@POST method
//@desc post a cart atelier
//@path:http://localhost:5000/api/atelier/profile
//@params Body
router.post("/profile",requireLogin,atelieradminMiddleware,validatecart,profileCont.postCart);

//@GETmethod
//@desc get all Carts
//@path:http://localhost:5000/api/atelier/cart
router.get("/cart",requireLogin, profileCont.getCart);

//@GET method
//@desc get one Cart
//@path:http://localhost:5000/api/atelier/cart/:id
//@params Id
router.get("/cart/:id",requireLogin, profileCont.getCartById);

//@DELETE method
//@desc delete one Cart by id
//@path:http://localhost:5000/api/atelier/cart/:id
//@params Id
router.delete("/cart/:id",requireLogin, profileCont.deleteCart);

//@PUT method
//@desc update one Cart by id
//@path:http://localhost:5000/api/atelier/profile/:id
//@params Id Body
router.put("/profile/:id",requireLogin,validatecart,profileCont.updateCart);

//@PUT method
//@desc like cart
//@path:http://localhost:5000/api/atelier/cart/like/:cart_id
//@params 
router.put('/cart/like/:cart_id',requireLogin,profileCont.likeCart);

//@PUT method
//@desc unlike cart
//@path:http://localhost:5000/api/atelier/cart/unlike/:cart_id
//@params 
router.put('/cart/unlike/:cart_id',requireLogin,profileCont.unlikeCart);

//@PUT method
//@desc comment cart
//@path:http://localhost:5000/api/atelier/cart/comment/:cart_id
//@params Body
router.put('/cart/comment/:cart_id',requireLogin,commentValidator,profileCont.commentCart);

//@PUT method
//@desc put like in comment of cart
//@path:http://localhost:5000/api/atelier/cart/like/:cart_id/:comment_id
//@params cart_id and comment_id
router.put('/cart/like/:cart_id/:comment_id',requireLogin,profileCont.likeComment);

//@delete method
//@desc remove like in comment of cart
//@path:http://localhost:5000/api/atelier/cart/like/:cart_id/:comment_id
//@params cart_id and comment_id
router.delete('/cart/unlike/:cart_id/:comment_id',requireLogin,profileCont.unlikeComment);

//@delete method
//@desc remove cart
//@path:http://localhost:5000/api/atelier/cart/uncomment/:cart_id
//@params cart_id and comment_id
router.delete('/cart/uncomment/:cart_id/:comment_id',requireLogin,profileCont.uncommentCart);

module.exports = router;
