const express = require("express");
const router = express.Router();
const categoryCont = require("../../controllers/atelier/category");
const {requireLogin,adminMiddleware,atelieradminMiddleware} = require("../../middleware/auth")

//@method POST
//@desc POST category
// @PATH  http://localhost:5000/api/atelier/category
// @Params  Body
router.post("/category",requireLogin,atelieradminMiddleware,categoryCont.createCategory);

//@method GET
//@desc get all categories
// @PATH  http://localhost:5000/api/atelier/category
// @Params  Body
router.get("/category",requireLogin,categoryCont.getCategories);

//@method put
//@desc update category
// @PATH  http://localhost:5000/api/atelier/category/:id
// @Params  Body
router.put("/category/:id",requireLogin,adminMiddleware,categoryCont.updateCategory);

//@method delete
//@desc delete category
// @PATH  http://localhost:5000/api/atelier/category/:id
// @Params  Body
router.delete("/category/:id",requireLogin,adminMiddleware,categoryCont.deleteCategory);

//@method GET
//@desc get category by Id
// @PATH  http://localhost:5000/api/atelier/category/:id
// @Params  Body
router.get("/category/:id",requireLogin,categoryCont.getCategory)



module.exports = router;