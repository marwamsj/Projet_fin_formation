const { check, validationResult } = require("express-validator");

// validation register
exports.validateRegister = [
  check("atelierName").notEmpty().withMessage("atelierName is required"),
  check("atelierName"),
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
module.exports.commentValidator = [
  check("textOfComment", "Text is empty").not().isEmpty(),
];

// validation cart
module.exports.validatecart = [
  check("email", "Valid Email is required").isEmail().isEmpty(),
  check("atelierName", "Atelier Name can't be empty").isEmpty(),
];