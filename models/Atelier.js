const mongoose = require("mongoose");
const schema = mongoose.Schema;

const atelierSchema = new schema(
  {
    Patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
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
      trim: true,
      unique: true,
      lowercase: true,
    },

    textDesciptif: { type: String, maxlength: 500 },
    contactNumber: { type: String },
    pofilePicture: { type: String },
    likes: [
      {
        Patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient",
        },
      },
    ],
    comments: [
      {
        Patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient",
        },
        username: {
          type: String,
          required: true,
        },
        pofilePicturepat: {
          type: String,
        },
        textOfTheComment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        likes: [
          {
            Patient: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Patient",
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Atelier", atelierSchema);
