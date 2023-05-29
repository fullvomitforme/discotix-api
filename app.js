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

// User routes
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, async (error) => {
  try {
    console.log(
      "============================== DB AUTHENTICATE =============================="
    );
    await db.sequelize.authenticate();
    console.log(
      "============================== DB AUTHENTICATE =============================="
    );
    // This creates the table if it doesn't exist (and does nothing if it already exists)
    console.log(
      "============================== DB SYNC ======================================"
    );
    await db.sequelize.sync();
    console.log(
      "============================== DB SYNC ======================================"
    );
    console.log(
      "Connection has been established successfully! 🎉✨ Get ready to boogie down with the disco vibes! 🕺💃"
    );
    console.log(
      "All models were synchronized successfully! 🎉✨ The disco dance floor is ready for action! Let's get the party started! 🕺💃"
    );
    console.log(
      `🏃‍♂️ Server is sprinting on port ${PORT}! Please open it at http://localhost:${PORT}/ Let's catch it before it escapes! 🏃‍♀️💨`
    );
  } catch (error) {
    console.error(
      "Unable to connect to the database. 😔🚫 Looks like the disco connection is experiencing some technical difficulties. Let's troubleshoot and get the database back in sync with the rhythm of the dance floor! 🎶💃",
      error
    );
  }
});

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});
