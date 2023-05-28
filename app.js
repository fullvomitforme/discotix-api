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

// routes
// user
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async (err) => {
  try {
    await db.sequelize.authenticate();
    // This creates the table if it doesn't exist (and does nothing if it already exists)
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");
    console.log("All models were synchronized successfully.");
    console.log(
      `🏃‍♂️ Server is sprinting on port ${PORT}! Please open it at http://localhost:4200/ Let's catch it before it escapes! 🏃‍♀️💨`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});
