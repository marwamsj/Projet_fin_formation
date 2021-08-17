const mongoose = require("mongoose");
const schema = mongoose.Schema;

const profileSchema = new schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    atelierName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    responsibleName: {
      type: String,
      min: 3,
      max: 20,
    },
    address: {
      type: String,
    },
    ville: { type: String },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    textDesciptif: { type: String, maxlength: 500 },
    contactNumber: { type: String },
    pofilePicture: {
      type: String,
      default:
        "https://c8.alamy.com/compfr/me1bgk/societe-de-portefeuille-modele-de-conception-de-logo-d-entreprise-vecteur-de-l-entreprise-icon-me1bgk.jpg",
    },
    cloudinaryId:{type: String},
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

  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
