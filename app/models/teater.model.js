module.exports = (sequelize, Sequelize) => {
  const Teater = sequelize.define("teater", {
    teater_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teater_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    opening_hours: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Teater;
};
