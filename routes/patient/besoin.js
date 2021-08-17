const express = require("express");
const router = express.Router();
const besoinCont = require("../../controllers/patient/besoin");
const {requireLogin,patientadminMiddleware} = require("../../middleware/auth")
const {commentValidator}=require("../../middleware/validator.atelier")

//@POST method
//@desc post besoin
//@path:http://localhost:5000/api/patient/besoin/product
//@params Body
router.post("/besoin/product",requireLogin,patientadminMiddleware, besoinCont.postBesoin);

//@GET method
//@desc get all Besoins
//@path:http://localhost:5000/api/patient/besoin
router.get("/besoin",requireLogin, besoinCont.getBesoin);

//@GET method
//@desc get Besoin By Id
//@path:http://localhost:5000/api/patient/besoin/:id
//@params Id
router.get("/besoin/:id",requireLogin, besoinCont.getBesoinById);

//@GET method
//@desc get Besoin By Category
//@path:http://localhost:5000/api/patient/besoin/:id_cart
//@params Id
router.get("/besoins/:id_cart",requireLogin, besoinCont.getBesoinByCategory);

//@DELETE method
//@desc delete one Besoin by id
//@path:http://localhost:5000/api/patient/besoin/:id
//@params Id
router.delete("/besoin/:id",requireLogin, besoinCont.deleteBesoin);

//@PUT method
//@desc update one Besoin by id
//@path:http://localhost:5000/api/patient/besoin/:id
//@params Id Body
router.put("/besoin/:id",requireLogin,besoinCont.updateBesoin);

//@PUT method
//@desc like Besoin
//@path:http://localhost:5000/api/patient/besoin/like/:bes_id
//@params art_id
router.put('/besoin/like/:bes_id',requireLogin,besoinCont.likeBesoin);

//@PUT method
//@desc unlike Besoin
//@path:http://localhost:5000/api/patient/besoin/unlike/:bes_id
//@params art_id
router.put('/besoin/unlike/:bes_id',requireLogin,besoinCont.unlikeBesoin);

//@PUT method
//@desc comment Besoin
//@path:http://localhost:5000/api/patient/besoin/comment/:bes_id
//@params Body and bes_id
router.put('/besoin/comment/:bes_id',requireLogin,commentValidator,besoinCont.commentBesoin);

//@PUT method
//@desc put like in the comment of Besoin
//@path:http://localhost:5000/api/patient/besoin/like/:bes_id/:comment_id
//@params bes_id and comment_id
router.put('/besoin/like/:bes_id/:comment_id',requireLogin,besoinCont.likeComment);

//@delete method
//@desc remove like from comment in Besoin
//@path:http://localhost:5000/api/patient/besoin/unlike/:bes_id/:comment_id
//@params bes_id and comment_id
router.delete('/Besoin/unlike/:bes_id/:comment_id',requireLogin,besoinCont.unlikeComment);

//@delete method
//@desc remove comment from Besoin
//@path:http://localhost:5000/api/patient/besoin/uncomment/:bes_id/:comment_id
//@params bes_id and comment_id
router.delete('/besoin/uncomment/:bes_id/:comment_id',requireLogin,besoinCont.uncommentBesoin);


module.exports = router;
