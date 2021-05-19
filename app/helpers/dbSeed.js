const db = require("../models");
const User = db.users;
module.exports = function () {
  User.create({
    username: "masterveloute",
    firstName: "Loyd",
    lastName: "VP",
    email: "LVP@gmail.com",
    password: "123456Guess",
  })
    .then((data) => {
      console.log("created veloute successful");
    })
    .catch((err) => {
      console.log(err);
    });
  User.create({
    username: "mintytruffles",
    firstName: "Lyn",
    lastName: "Thi",
    email: "MLT@gmail.com",
    password: "Guess123456",
  })
    .then((data) => {
      console.log("created minty successful");
    })
    .catch((err) => {
      console.log(err);
    });
};
