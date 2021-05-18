const db = require("../models");
const User = db.users;

exports.register = (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  User.findOne({ email });
};
