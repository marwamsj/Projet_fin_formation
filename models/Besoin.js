const mongoose = require("mongoose");
const besoinSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    besoinPictures: { type: String },
    cloudinaryId: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: {
      type: String,
    },
    pofilePicture: {
      type: String,
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
        pofilePicture: {
          type: String,
        },
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

module.exports = mongoose.model("Besoin", besoinSchema);
