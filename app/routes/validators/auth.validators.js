const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("firstName").not().isEmail().withMessage("First name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
