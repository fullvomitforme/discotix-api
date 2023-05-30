module.exports = (sequelize, Sequelize) => {
  const Film = sequelize.define("film_catalog", {
    film_id: {
      type: Sequelize.INTEGER, // or Sequelize.UUID if using a unique identifier
      primaryKey: true,
      autoIncrement: true,
    },
    film_title: {
      type: Sequelize.STRING, // or Sequelize.TEXT
      allowNull: false,
    },
    film_rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    release_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING, // or Sequelize.TEXT
      allowNull: false,
    },
    director: {
      type: Sequelize.STRING, // or Sequelize.TEXT
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING, // or Sequelize.TEXT
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER, // or Sequelize.SMALLINT
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    production_company: {
      type: Sequelize.STRING, // or Sequelize.TEXT
      allowNull: false,
    },
    cast: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Film;
};
