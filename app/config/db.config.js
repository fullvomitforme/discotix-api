module.exports = {
  HOST: "localhost",
  PORT: 5432,
  USER: "tazkiya",
  PASSWORD: "root",
  DB: "discotix-db",
  dialect: "postgres",
  pool: {
    max: 25,
    min: 5,
    acquire: 300000,
    idle: 10000,
  },
};
