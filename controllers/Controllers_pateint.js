const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const patientCont = {
  register: async (req, res) => {
    const { firstName, lastName, username, email, pass } = req.body;
    try {
      // check if the username exist
      const usernamePatient = await User.findOne({ username });
      if (usernamePatient) {
        return res.status(401).json({ msg: "This username is already exist." });
      }
      // check if the email exist
      const searchPatient = await User.findOne({ email });
      if (searchPatient) {
        return res.status(401).json({ msg: "This email is already exist." });
      }
      //length password
      if (pass.length < 6) {
        return res
          .status(401)
          .json({ msg: "Password is at least 6 characters long." });
      }
      // hash the password
      const password = await bcrypt.hash(pass, 10);
      const newPatient = new User({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      // save the Patient
      await newPatient.save();

      // then create jsonwebtoken to authentication
      const accesstoken = createAccessToken(newPatient._id, newPatient.role);
      const refreshtoken = createRefreshToken(newPatient._id, newPatient.role);
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/patient/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.status(201).json({ accesstoken, newPatient });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    const { email, pass } = req.body;
    try {
      //   find if the patient exist
      const searchedPatient = await User.findOne({ email });
      // if the email dont exist
      if (!searchedPatient) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      // password are equals
      const match = await bcrypt.compare(pass, searchedPatient.password);

      if (!match) {
        return res.status(400).send({ msg: "bad Credential" });
      }
      // If login success , create access token and refresh token
      const accesstoken = createAccessToken(
        searchedPatient._id,
        searchedPatient.role
      );
      const refreshtoken = createRefreshToken(
        searchedPatient._id,
        searchedPatient.role
      );

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/patient/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({
        accesstoken,
        searchedPatient,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/patient/refresh_token" });

      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshtoken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, patient) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = createAccessToken(patient._id, patient.role);

        res.json({ accesstoken });
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = patientCont;
