const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminCont = {
  register: async (req, res) => {
    try {
      const firstName = process.env.First_Name;

      const lastName = process.env.Last_Name;

      const username = process.env.User_Name;

      const email = process.env.Email;

      const password = process.env.Pass;
      // hash the password
      const hashedpassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        firstName,
        lastName,
        username,
        email,
        role: "admin",
        password: hashedpassword,
      });

      // save the Admin
      await newAdmin.save();

      // then create jsonwebtoken to authentication
      const accesstoken = createAccessToken(newAdmin._id, newAdmin.role);
      res.cookie("accesstoken", accesstoken, {
        maxAge: 24 * 60 * 60 * 1000, // 1d
      });

      res.status(201).json({ accesstoken, newAdmin });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // if the email dont exist
      if (!user) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      if (user.role !== "admin") {
        return res.status(400).send({ msg: "Yous are not an admin" });
      }

      // password are equals
      const passmatch = await bcrypt.compare(password, user.password);

      if (!passmatch) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      // If login success , create access token and refresh token
      const accesstoken = createAccessToken(user._id, user.role);
      res.cookie("accesstoken", accesstoken);

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

      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = adminCont;
