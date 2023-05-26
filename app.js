const express = require("express");
const dotenv = require("dotenv");
const db = require("./app/models/index.model");
dotenv.config();
const app = express();

// some middleware
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.status(200).json({
    message: `🏃‍♂️ Server is sprinting on port ${PORT}! Let's catch it before it escapes! 🏃‍♀️💨`,
  });
});

// testing connection
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async (err) => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(
      `🏃‍♂️ Server is sprinting on port ${PORT}! Please open it at http://localhost:4200/ Let's catch it before it escapes! 🏃‍♀️💨`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
