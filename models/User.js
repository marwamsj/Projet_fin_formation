const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
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
    pofilePicture: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods = {
  authenticate: async function (pass) {
    return await bcrypt.compare(pass, this.password);
  },
};

module.exports = mongoose.model("User", UserSchema);
