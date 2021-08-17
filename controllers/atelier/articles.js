const Articles = require("../../models/Articles");
const User = require("../../models/User");
const { validationResult } = require("express-validator");

const articlesCont = {
  //@desc post Articles
  postArticles: async (req, res) => {
    try {
      const { name, description, productPictures, cloudinaryId, category } =
        req.body;

      if (!productPictures)
        return res.status(400).send({ msg: "No image upload" });
      // check if the username exist
      const nameArticle = await Articles.findOne({ name });
      if (nameArticle) {
        return res
          .status(401)
          .send({ msg: "This name Article is already exist." });
      }
      const newArticle = new Articles({
        name,
        description,
        productPictures,
        cloudinaryId,
        category,
        createdBy: req.user._id,
      });

      // save the Article
      await newArticle.save();

      res.status(200).send({ newArticle, msg: "Product is saved" });
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },

  //@desc get all Articles
  getArticles: async (req, res) => {
    try {
      const result = await Articles.find();
      res
        .status(200)
        .send({ response: result, msg: "geting Articles successfuly" });
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },

  //@desc get Article By Id
  getArticleById: async (req, res) => {
    try {
      const { productId } = req.params;
      if (productId) {
        const result = await Articles.findOne({ _id: productId });
        res
          .status(200)
          .send({ response: result, msg: "geting Article successfuly" });
      }
    } catch (error) {
      res.status(400).send({ msg: "there is no Article with this id" });
    }
  },
  //@desc get Articles by category
  getArticleByCategory: async (req, res) => {
    try {
      const result = await Articles.find({ category: req.params.id_art });
      res.send({ response: result, msg: "geting Article successfuly" });
    } catch (error) {
      res.status(400).send({ msg: "there is no Article with this category" });
    }
  },

  //@desc delete one Article by id
  deleteArticle: async (req, res) => {
    try {
      const article = await Articles.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (article.createdBy.toString() !== req.user._id.toString())
          return res
            .status(401)
            .send("You are not allowed to delete this product!");
      }

      const result = await Articles.deleteOne({ _id: req.params.id });
      res.send({ message: "Product is deleted" });
    } catch (error) {
      res.status(400).send({ msg: "there is no Article with this id" });
    }
  },

  //@desc update one Article by id
  updateArticle: async (req, res) => {
    try {
      const article = await Articles.findById(req.params.id);

      const result = await Articles.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );

      res.send({ msg: "Article is updated" });
    } catch (error) {
      res.status(400).send({ msg: "there is no Article with this id" });
    }
  },

  //@desc put like in Article
  likeArticle: async (req, res) => {
    try {
      let result = await Articles.findById(req.params.art_id);

      if (!result) return res.status(404).send("Article not found");

      if (result.likes.find((like) => like.user.toString() === req.user._id))
        return res.status(401).send("You already liked this Article !");

      let newLike = {
        user: req.user._id,
      };

      result.likes.unshift(newLike);

      await result.save();

      res.send(result);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc put unlike in Article
  unlikeArticle: async (req, res) => {
    try {
      let result = await Articles.findById(req.params.art_id);

      if (!result) return res.status(404).send("Post not found");

      const removeLike = result.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      result.likes = removeLike;

      await result.save();

      res.send(result);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc put comment Article
  commentArticle: async (req, res) => {
    try {
      let article = await Articles.findById(req.params.art_id);
      let user = await User.findById(req.user._id).select("-password");

      const { textOfComment } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

      if (!user) return res.status(404).send("User not found");

      if (!article) return res.status(404).send("Article not found");

      let newComment = {
        textOfComment,
        user: req.user._id,
        username: user.username,
        pofilePicture: user.pofilePicture,
      };
      article.comments.unshift(newComment);

      await article.save();

      res.send("Comment is added");
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc put like in the comment of Article
  likeComment: async (req, res) => {
    try {
      let article = await Articles.findById(req.params.art_id);

      if (!article) return res.status(404).send("Article not found!");

      const commentFromArticle = article.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      if (!commentFromArticle) return res.status(404).send("Comment not found");

      let newLike = {
        user: req.user._id,
      };

      commentFromArticle.likes.unshift(newLike);

      await article.save();

      res.send("Comment is liked");
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc remove like from comment in Article
  unlikeComment: async (req, res) => {
    try {
      let article = await Articles.findById(req.params.art_id);

      if (!article) return res.status(404).send("Article not found");

      const comment = article.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      const removeLikeFromComment = comment.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      comment.likes = removeLikeFromComment;

      await article.save();

      res.send(article);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc remove comment from Article
  uncommentArticle: async (req, res) => {
    try {
      let article = await Articles.findById(req.params.art_id);

      if (!article) return res.status(404).send("Article not found");
      const comment = article.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );
      if (req.user.role.toString() !== "admin") {
        if (comment.user.toString() !== req.user._id.toString())
          return res
            .status(401)
            .send("You are not allowed to delete this comment!");
      }

      await comment.remove();
      await article.save();

      res.send(article);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  //@desc add rating
  ratingArticle: async (req, res) => {
    try {
      const { rating } = req.body;

      const article = await Articles.findById(req.params.art_id);
      if (!article) return res.status(404).send("Article not found");

      const Rated = article.reviews.find(
        (rate) => rate.user.toString() === req.user._id.toString()
      );

      if (Rated) {
        return res.status(400).send("This product is already rated");
      }
      const rate = {
        user: req.user._id,
        rating: Number(rating),
      };

      article.reviews.push(rate);
      article.numReviews = article.reviews.length;

      article.rating =
        article.reviews.reduce((acc, item) => item.rating + acc, 0) /
        article.reviews.length;

      await article.save();
      res.status(201).send("Rating added");
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },

  getTopArticle: async (req, res) => {
    try {
      const Article = await Articles.find().sort({ rating: -1 });
      res.send(Article);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
};

module.exports = articlesCont;
