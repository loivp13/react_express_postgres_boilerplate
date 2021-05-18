const bcrypt = require("bcrypt");
module.exports = (sequelize, Sequelize) => {
  //create columns with ids
  // ***NOTE*** createdAt, updatedAt are generated automatically
  //CRUD functions are prebaked in squelize
  const User = sequelize.define(
    "user",
    {
      userId: {
        field: "user_id",
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1],
            msg: "First name is required.",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1],
            msg: "Last name is required.",
          },
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [6],
            msg: "Username needs a minimum of 6 characters.",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Password needs a minimum of 6 characters.",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email format is incorrect.",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      instanceMethods: {
        validPassword: {
          validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
          },
        },
      },
    }
  );

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return User;
};
