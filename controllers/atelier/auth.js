const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const atelierCont = {
  register: async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    try {
      // check if the username exist
      const user = await User.findOne({ username });
      if (user) {
        return res.status(401).json({ msg: "This username is already exist." });
      }
      // check if the email exist
      const searchAtelier = await User.findOne({ email });
      if (searchAtelier) {
        return res.status(401).json({ msg: "This email is already exist." });
      }
      //length password
      if (password.length < 6) {
        return res
          .status(401)
          .json({ msg: "Password is at least 6 characters long." });
      }
      // hash the password
      const passwordhash = await bcrypt.hash(password, 10);
      const newAtelier = new User({
        firstName,
        lastName,
        username,
        email,
        role: "atelier",
        password: passwordhash,
      });

      // save the Patient
      // await newAtelier.save();
      await newAtelier.save((error, user) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (user) {
          const {
            _id,
            role,
            firstName,
            lastName,
            username,
            email,
            password,
            contactNumber,
            pofilePicture,
            cloudinaryId,
          } = user;
          const accesstoken = createAccessToken(user._id, user.role);
          res.cookie("accesstoken", accesstoken, {
            maxAge: 24 * 60 * 60 * 1000, // 1d
          });
          return res.status(200).json({
            accesstoken,
            user: {
              _id,
              role,
              firstName,
              lastName,
              username,
              email,
              password,
              contactNumber,
              pofilePicture,
              cloudinaryId,
            },
          });
        }
      });
      // then create jsonwebtoken to authentication
    /*  const accesstoken = createAccessToken(newAtelier._id, newAtelier.role);
      res.cookie("accesstoken", accesstoken, {
        maxAge: 24 * 60 * 60 * 1000, // 1d
      });

      res.status(200).send({ accesstoken, newAtelier });*/
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      //   find if the patient exist
      const user = await User.findOne({ email });
      // if the email dont exist
      if (!user) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      if (user.role !== "atelier") {
        return res
          .status(400)
          .send({ msg: "Yous are not a Customer Workshop" });
      }
      // password are equals
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      // If login success , create access token and refresh token
      const accesstoken = createAccessToken(user._id, user.role);
      res.cookie("accesstoken", accesstoken, {
        maxAge: 24 * 60 * 60 * 1000, // 1d
      });

      res.json({
        accesstoken,
        user,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("accesstoken");
      return res.send({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //@desc get user
  getUser: async (req, res) => {
    try {
      const result = await User.findById(req.user._id);
      res.send({ response: result, msg: "geting user successfuly" });
    } catch (error) {
      res.status(404).send({ msg: "there is no User with this id" });
    }
  },
  //@desc update user
  updateUser: async (req, res) => {
    try {
      const result = await User.updateOne(
        { _id: req.user._id },
        { $set: { ...req.body } }
      );

      result.nModified
        ? res.send({ msg: "user is updated" })
        : res.send({ msg: "user is already updated" });
    } catch (error) {
      res.status(404).send({ msg: "there is no User with this id" });
    }
  },
};

const createAccessToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = atelierCont;
