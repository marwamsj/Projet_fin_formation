const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["patient", "atelier", "admin"],
      default: "patient",
    },
    password: {
      type: String,
      min: 6,
      max: 50,
    },
    contactNumber: { type: String },
    pofilePicture: {
      type: String,
     //default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    cloudinaryId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
