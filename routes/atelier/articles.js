const express = require("express");
const router = express.Router();
const articlesCont = require("../../controllers/atelier/articles");
const {requireLogin,atelieradminMiddleware} = require("../../middleware/auth")
const {commentValidator}=require("../../middleware/validator.atelier")

//@POST method
//@desc post an article
//@path:http://localhost:5000/api/atelier/articles/product
//@params Body
router.post("/articles/product",requireLogin,atelieradminMiddleware, articlesCont.postArticles);

//@GET method
//@desc get all articles
//@path:http://localhost:5000/api/atelier/articles
router.get("/articles",requireLogin, articlesCont.getArticles);

//@GET method
//@desc get Article By Id
//@path:http://localhost:5000/api/atelier/article/:productId
//@params productId
router.get("/article/:productId",requireLogin, articlesCont.getArticleById);

//@GET method
//@desc get Article By Category
//@path:http://localhost:5000/api/atelier/articles/:id_cart
//@params Id
router.get("/articles/:id_art",requireLogin, articlesCont.getArticleByCategory);

//@DELETE method
//@desc delete one Article by id
//@path:http://localhost:5000/api/atelier/article/:id
//@params Id
router.delete("/article/:id",requireLogin, articlesCont.deleteArticle);

//@PUT method
//@desc update one Article by id
//@path:http://localhost:5000/api/atelier/article/:id
//@params Id Body
router.put("/article/:id",requireLogin,articlesCont.updateArticle);

//@PUT method
//@desc like Article
//@path:http://localhost:5000/api/atelier/article/like/:art_id
//@params art_id
router.put('/article/like/:art_id',requireLogin,articlesCont.likeArticle);

//@PUT method
//@desc unlike Article
//@path:http://localhost:5000/api/atelier/article/unlike/:art_id
//@params art_id
router.put('/article/unlike/:art_id',requireLogin,articlesCont.unlikeArticle);

//@PUT method
//@desc comment Article
//@path:http://localhost:5000/api/atelier/article/comment/:art_id
//@params Body
router.put('/article/comment/:art_id',requireLogin,commentValidator,articlesCont.commentArticle);

//@PUT method
//@desc put like in the comment of Article
//@path:http://localhost:5000/api/atelier/article/like/:art_id/:comment_id
//@params art_id and comment_id
router.put('/article/like/:art_id/:comment_id',requireLogin,articlesCont.likeComment);

//@delete method
//@desc remove like from comment in Article
//@path:http://localhost:5000/api/atelier/article/unlike/:art_id/:comment_id
//@params art_id and comment_id
router.delete('/article/unlike/:art_id/:comment_id',requireLogin,articlesCont.unlikeComment);

//@delete method
//@desc remove comment from Article
//@path:http://localhost:5000/api/atelier/article/uncomment/:art_id
//@params art_id and comment_id
router.delete('/article/uncomment/:art_id/:comment_id',requireLogin,articlesCont.uncommentArticle);

//@PUT method
//@desc put rate in Article
//@path:http://localhost:5000/api/atelier/article/rate/:art_id
//@params art_id and Body
router.put('/article/rate/:art_id',requireLogin,articlesCont.ratingArticle)

//@Get method
//@desc put rate in Article
//@path:http://localhost:5000/api/atelier/articles/rate
//@params art_id and Body
router.get('/articles/rate/dec',requireLogin,articlesCont.getTopArticle)

module.exports = router;
