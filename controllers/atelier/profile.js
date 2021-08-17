const Atelier = require("../../models/Profile");
const User = require("../../models/User");
const { validationResult } = require("express-validator");

const profileCont = {
  //@desc post a Cart
  postCart: async (req, res) => {
    const {
      atelierName,
      responsibleName,
      address,
      ville,
      email,
      textDesciptif,
      contactNumber,
      pofilePicture,
      cloudinaryId,
    } = req.body;
    try {
      // check if the username exist
      const nameAtelier = await Atelier.findOne({ atelierName });
      if (nameAtelier) {
        return res
          .status(401)
          .json({ msg: "This atelier Name is already exist." });
      }
      // check if the email exist
      const searchAtelier = await Atelier.findOne({ email });
      if (searchAtelier) {
        return res.status(401).json({ msg: "This email is already exist." });
      }
      const newAtelier = new Atelier({
        atelierName,
        responsibleName,
        address,
        ville,
        email,
        textDesciptif,
        contactNumber,
        pofilePicture,
        cloudinaryId,
        createdBy: req.user._id,
      });
      // save the Cart
      await newAtelier.save();

      res.status(200).json({ newAtelier, msg: "Workshop carte is saved" });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },

  //@desc get all Ateliers
  getCart: async (req, res) => {
    try {
      const result = await Atelier.find();
      res.send({ response: result, message: "geting ateliers successfuly" });
    } catch (error) {
      res.status(400).send({ message: "can not get ateliers" });
    }
  },

  //@desc get one Ateliers
  getCartById: async (req, res) => {
    try {
      const result = await Atelier.findOne({ _id: req.params.id });
      res.send({ response: result, message: "geting ateliers successfuly" });
    } catch (error) {
      res.status(400).send({ message: "there is no ateliers with this id" });
    }
  },

  //@desc delete one Atelier by id
  deleteCart: async (req, res) => {
    try {
      const cart = await Atelier.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (cart.createdBy.toString() !== req.user._id.toString())
          return res
            .status(401)
            .json("You are not allowed to delete the cart!");
      }
      const result = await Atelier.deleteOne({ _id: req.params.id });
      result.n
        ? res.send({ message: "contact is deleted" })
        : res.send({ message: "contact is already deleted" });
    } catch (error) {
      res.status(400).send({ message: "there is no contact with this id" });
    }
  },

  //@desc update one contact by id
  updateCart: async (req, res) => {
    try {
      const cart = await Atelier.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (cart.createdBy.toString() !== req.user._id.toString())
          return res
            .status(401)
            .json("You are not allowed to delete the cart!");
      }

      const result = await Atelier.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      result.nModified
        ? res.send({ message: "contact is updated" })
        : res.send({ message: " contact is already updated" });
    } catch (error) {
      res.status(400).send({ message: "there is no contact with this id" });
    }
  },
  //@desc put like in profile cart
  likeCart: async (req, res) => {
    try {
      let result = await Atelier.findById(req.params.cart_id);

      if (!result) return res.status(404).json("Cart not found");

      if (result.likes.find((like) => like.user.toString() === req.user._id))
        return res.status(401).json("You already liked this cart !");

      let newLike = {
        user: req.user._id,
      };

      result.likes.unshift(newLike);

      await result.save();

      res.json(result);
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc put unlike in profile cart
  unlikeCart: async (req, res) => {
    try {
      let result = await Atelier.findById(req.params.cart_id);

      if (!result) return res.status(404).json("Cart not found");

      const removeLike = result.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      result.likes = removeLike;

      await result.save();

      res.json(result);
    } catch (err) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc put comment in profile cart
  commentCart: async (req, res) => {
    try {
      let cart = await Atelier.findById(req.params.cart_id);
      let user = await User.findById(req.user._id).select("-password");

      const { textOfComment } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      if (!user) return res.status(404).json("User not found");

      if (!cart) return res.status(404).json("cart not found");

      let newComment = {
        textOfComment,
        user: req.user._id,
        username: user.username,
        pofilePicture: user.pofilePicture,
      };
      cart.comments.unshift(newComment);

      await cart.save();

      res.json("Comment is added");
    } catch (error) {
      return res.status(401).json({ msg: error.message });
    }
  },

  //@desc put like in the comment of profile cart
  likeComment: async (req, res) => {
    try {
      let cart = await Atelier.findById(req.params.cart_id);

      if (!cart) return res.status(404).json("cart not found!");

      const commentFromcart = cart.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      if (!commentFromcart) return res.status(404).json("Comment not found");

      let newLike = {
        user: req.user._id,
      };

      commentFromcart.likes.unshift(newLike);

      await cart.save();

      res.json("Comment is liked");
    } catch (error) {
      return res.status(401).json("Server Error...");
    }
  },
  //@desc remove like from cart
  unlikeComment: async (req, res) => {
    try {
      let cart = await Atelier.findById(req.params.cart_id);

      if (!cart) return res.status(404).json("cart not found");

      const comment = cart.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      const removeLikeFromComment = comment.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      comment.likes = removeLikeFromComment;

      await cart.save();

      res.json(cart);
    } catch (error) {
      return res.status(401).json("Server Error...");
    }
  },
  uncommentCart: async (req, res) => {
    try {
      let post = await Atelier.findById(req.params.cart_id);

      if (!post) return res.status(404).json("Post not found");

      const comment = post.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      if (req.user.role.toString() !== "admin") {
        if (comment.user.toString() !== req.user._id.toString())
          return res
            .status(401)
            .json("You are not allowed to delete this comment!");
      }

      await comment.remove();
      await post.save();

      res.json(post);
    } catch (error) {
      return res.status(401).json("Server Error...");
    }
  },
};

module.exports = profileCont;
