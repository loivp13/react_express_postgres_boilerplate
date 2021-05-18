const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.register = (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  User.create({ firstName, lastName, username, password, email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err)
        res.status(500).send({
          message:
            err.errors[0].message ||
            "An error occured while creating account, please try again",
        });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((data) => {
      //No user was found
      if (!data) {
        res.status(401).json({
          message: "Unable to login. Email or password is incorrect",
        });
      }

      //found user validate password
      if (!data.validPassword(password)) {
        res
          .status(401)
          .json({ message: "Unable to login. Email or password is incorrect" });
      }
      //generate JWT and send to client
      const token = jwt.sign({ _id: data.userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
    })
    .catch((err) => {
      res.json({
        message:
          err.errors[0].message ||
          "An error occured while logging in, please try again",
      });
    });
};
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});
