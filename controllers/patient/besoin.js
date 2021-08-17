const Besoin = require("../../models/Besoin");
const User = require("../../models/User");
const { validationResult } = require("express-validator");

const BesoinCont = {
  //@desc post Besoin
  postBesoin: async (req, res) => {
    try {
      const { description, besoinPictures, cloudinaryId, category } = req.body;

      if (!description)
        return res.status(400).json({ msg: "Your description need is empty" });
      let user = await User.findById(req.user._id).select("-password");
      const newBesoin = new Besoin({
        description,
        besoinPictures,
        cloudinaryId,
        category,
        user: req.user._id,
        username: user.username,
        pofilePicture: user.pofilePicture,
      });

      // save the Besoin
      await newBesoin.save();

      res.status(200).json({ newBesoin, msg: "Your need is saved" });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },

  //@desc get all Besoins
  getBesoin: async (req, res) => {
    try {
      const result = await Besoin.find();
      res.send({ response: result, message: "geting Needs successfuly" });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },

  //@desc get Besoin By Id
  getBesoinById: async (req, res) => {
    try {
      const result = await Besoin.findOne({ _id: req.params.id });
      res.send({ response: result, message: "geting Besoin successfuly" });
    } catch (error) {
      res.status(400).send({ message: "there is no Besoin with this id" });
    }
  },

  //@desc get Besoin by category
  getBesoinByCategory: async (req, res) => {
    try {
      const result = await Besoin.find({ category: req.params.id_cart });
      res.send({ response: result, message: "geting Besoin successfuly" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "there is no Besoin with this category" });
    }
  },

  //@desc delete one Besoin by id
  deleteBesoin: async (req, res) => {
    try {
      const besoin = await Besoin.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (besoin.user.toString() !== req.user._id.toString())
          return res
            .status(401)
            .json("You are not allowed to delete the comment!");
      }

      const result = await Besoin.deleteOne({ _id: req.params.id });
      res.send({ message: "Besoin is deleted" });
    } catch (error) {
      res
        .status(400)
        .send({ message: "there is no Besoin to delete with this id" });
    }
  },

  //@desc update one Besoin by id
  updateBesoin: async (req, res) => {
    try {
      const besoin = await Besoin.findById(req.params.id);
      if (req.user.role.toString() !== "admin") {
        if (besoin.user.toString() !== req.user._id.toString())
          return res.status(401).json("You are not allowed to do that!");
      }

      const result = await Besoin.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );

      res.send({ message: "Besoin is updated" });
    } catch (error) {
      res.status(400).send({ message: "there is no Besoin with this id" });
    }
  },
  //@desc put like in Besoin
  likeBesoin: async (req, res) => {
    try {
      let result = await Besoin.findById(req.params.bes_id);

      if (!result) return res.status(404).json("Besoin not found");

      if (result.likes.find((like) => like.user.toString() === req.user._id))
        return res.status(401).json("You already liked this Besoin !");

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
  //@desc put unlike in Besoin
  unlikeBesoin: async (req, res) => {
    try {
      let result = await Besoin.findById(req.params.bes_id);

      if (!result) return res.status(404).json("Post not found");

      const removeLike = result.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      result.likes = removeLike;

      await result.save();

      res.json(result);
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc put comment Besoin
  commentBesoin: async (req, res) => {
    try {
      let besoin = await Besoin.findById(req.params.bes_id);
      let user = await User.findById(req.user._id).select("-password");

      const { textOfComment } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      if (!user) return res.status(404).json("User not found");

      if (!besoin) return res.status(404).json("Besoin not found");

      let newComment = {
        textOfComment,
        user: req.user._id,
        username: user.username,
        pofilePicture: user.pofilePicture,
      };
      besoin.comments.unshift(newComment);

      await besoin.save();

      res.json("Comment is added");
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc put like in the comment of Besoin
  likeComment: async (req, res) => {
    try {
      let besoin = await Besoin.findById(req.params.bes_id);

      if (!besoin) return res.status(404).json("Besoin not found!");

      const commentFromBesoin = besoin.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      if (!commentFromBesoin) return res.status(404).json("Comment not found");

      let newLike = {
        user: req.user._id,
      };

      commentFromBesoin.likes.unshift(newLike);

      await besoin.save();

      res.json("Comment is liked");
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc remove like from comment in Besoin
  unlikeComment: async (req, res) => {
    try {
      let besoin = await Besoin.findById(req.params.bes_id);

      if (!besoin) return res.status(404).json("Besoin not found");

      const comment = besoin.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );

      const removeLikeFromComment = comment.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );

      comment.likes = removeLikeFromComment;

      await besoin.save();

      res.json(besoin);
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
  //@desc remove comment from Besoin
  uncommentBesoin: async (req, res) => {
    try {
      let besoin = await Besoin.findById(req.params.bes_id);

      if (!besoin) return res.status(404).json("Besoin not found");
      const comment = besoin.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id.toString()
      );
      if (req.user.role.toString() !== "admin") {
        if (comment.user.toString() !== req.user._id.toString())
          return res
            .status(401)
            .json("You are not allowed to delete the comment!");
      }

      await comment.remove();
      await besoin.save();

      res.json(besoin);
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },
};

module.exports = BesoinCont;
