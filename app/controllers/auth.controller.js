const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const mailTransporter = require("../nodemailer/transporter");

exports.register = (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  User.findOne({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  }).then((data) => {
    //if data exist email or username is taking
    if (data) {
      console.log(data);
      res.status(400).json({
        message: "email or password is already taken",
      });
    }

    //if data does not exist send double optin email
    const token = jwt.sign(
      { firstName, lastName, username, password, email },
      process.env.JWT_ACCOUNT_ACTIVATION
    );
    let mailOptions = {
      from: "app@gmail.com",
      to: email,
      subject: "Confirmation email for app",
      text: `localhost:8000/api/auth/activate/${token}`,
    };
    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({
          message: error,
        });
      } else {
        res.json({
          message: `Email sent:${info.response}`,
        });
      }
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

exports.activate = (req, res) => {};

exports.forgotPassword = (req, res) => {};
