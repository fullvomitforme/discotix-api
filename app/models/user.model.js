const { hashPassword } = require("../utility/hashUtils");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users_stats", {
    fullname: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await hashPassword(user.password);
  });

  return User;
};
