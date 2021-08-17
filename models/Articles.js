const mongoose = require("mongoose");
const articlesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    productPictures: { type: String, required: true },
    cloudinaryId: { type: String },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        username: {
          type: String,
          required: true,
        },
        pofilePicture: [],
        textOfComment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        likes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          },
        ],
      },
    ],
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", articlesSchema);
