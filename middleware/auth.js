const jwt = require("jsonwebtoken");

exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const accesstoken = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }

  next();
};
// patient access
exports.patientMiddleware = (req, res, next) => {
  if (req.user.role !== "patient") {
    return res.status(400).json({ message: "atelier access denied" });
  }
  next();
};
// atelier and admin access
exports.atelieradminMiddleware = (req, res, next) => {
  if (req.user.role !== "atelier") {
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "patient access denied" });
    }
  }
  next();
};
exports.patientadminMiddleware = (req, res, next) => {
  if (req.user.role !== "patient") {
    if (req.user.role !== "admin") {
      return res.status(400).json({ message: "atelier access denied" });
    }
  }
  next();
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(200).json({ message: "Admin access" });
  }
  next();
};
