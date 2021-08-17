const { check, validationResult } = require("express-validator");

// validation register
exports.validateRegister = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("lastName is required"),
  check("lastName"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

// validation login
exports.validateLogin = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};
