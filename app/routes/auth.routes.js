let router = require("express").Router();
//importing controllers
const auth = require("../controllers/auth.controller");
const { register, login } = auth;

//import validator
const validators = require("./validators/auth.validators");
const {
  userRegisterValidator,
  userLoginValidator,
  userResetPasswordValidator,
  userForgotPasswordValidator,
  userUpdateValidator,
} = validators;

const { runValidation } = require("./validators");

router.get("/", (req, res) => {
  res.json({ message: "hit" });
});

// register a new User
router.post("/", userRegisterValidator, runValidation, register);

//user login
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;
