const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const patientCont = {
  register: async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    try {
      // check if the username exist
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).send({ msg: "This username is already exist." });
      }
      // check if the email exist
      const searchPatient = await User.findOne({ email });
      if (searchPatient) {
        return res.status(400).send({ msg: "This email is already exist." });
      }
      //length password
      if (password.length < 6) {
        return res
          .status(400)
          .send({ msg: "Password is at least 6 characters long." });
      }
      // hash the password
      const passwordhash = await bcrypt.hash(password, 10);
      const newPatient = new User({
        firstName,
        lastName,
        username,
        email,
        password: passwordhash,
      });

      // save the Patient
      //await newPatient.save();

      // then create jsonwebtoken to authentication
     /* const accesstoken = createAccessToken(newPatient._id, newPatient.role);
      res.cookie("accesstoken", accesstoken, {
        maxAge: 24 * 60 * 60 * 1000, // 1d
      });*/
     // const { newPatient._id, firstName, lastName, email, role, fullName } = user;
     await newPatient.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (user) {
        
        const { _id, role , firstName, lastName, username , email, password ,contactNumber,pofilePicture , cloudinaryId } = user;
        const accesstoken = createAccessToken(user._id, user.role);
      res.cookie("accesstoken", accesstoken, {
        maxAge: 24 * 60 * 60 * 1000, // 1d
      });
        return res.status(200).json({
          accesstoken,
          user: { _id, role , firstName, lastName, username , email, password ,contactNumber,pofilePicture , cloudinaryId },
        })}})
     // res.json({ accesstoken, newPatient });
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      //   find if the patient exist
      const user = await User.findOne({ email });

      // if the email dont exist
      if (!user) {
        return res.status(400).json({ msg: "bad Credential" });
      }
      if (user.role !== "patient") {
        return res.status(400).json({ msg: "Yous are not a patient" });
      }
      // password are equals
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ msg: "bad Credential" });
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
};

const createAccessToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = patientCont;
