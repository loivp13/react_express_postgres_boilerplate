let router = require("express").Router();
//importing controllers
const auth = require("../controllers/auth.controller");
const { register } = auth;

//import validator
const validators = require("./validators/auth.validators");
const { userRegisterValidator } = validators;

const { runValidation } = require("./validators");

router.get("/", (req, res) => {
  res.json({ message: "hit" });
});

// register a new User
router.post("/", userRegisterValidator, runValidation, register);

module.exports = router;
