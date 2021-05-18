const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");

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
