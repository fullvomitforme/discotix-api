const { json } = require("sequelize");
const db = require("../models/index.model");
const User = db.user;
const { hashPassword, comparePassword } = require("../utility/hashUtils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all users
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({
      message: `Failed to fetch users. Error: ${error.message} 😔🚫 Disco glitch! We couldn't retrieve the user list due to an error. Please try again later and let the disco vibes flow through! 🎶💃`,
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return (
        res.status(400),
        json({
          message:
            "Uh-oh! We couldn't find any user with that ID. 😔🔍 Looks like they're hiding from the disco lights. Keep searching and find a user who's ready to boogie down! 🕺💫",
        })
      );
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("User search failed:", error);
    res.status(404).json({
      message:
        "User search failed! 😔🔍 Oops! We couldn't find any user with that ID. They must have slipped out of the disco! Keep searching, and don't give up! 🕵️‍♂️💃",
    });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { first_name, last_name, username, email, phone_number, password } =
    req.body;

  const fullname = first_name + " " + last_name;
  const userInput = {
    fullname,
    username,
    email,
    phone_number,
    password,
  };

  const existUser = await User.findOne({
    where: { username: userInput.username },
  });

  if (existUser) {
    return res.status(400).json({
      message:
        "Oops! Username already exists! 😕🚫 Choose a unique username and let your disco identity shine! 💃✨",
    });
  }

  try {
    const hashedPassword = await hashPassword(newUser.password);
    userInput.password = hashedPassword;

    const createUser = await User.create(userInput);
    res.status(200).json({
      data: createUser,
      message:
        "User added successfully! 🎉🎥 Welcome aboard the Discotix! Get your popcorn ready and prepare for an epic movie marathon! 🍿🎬",
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found! 😕🔍 We searched high and low, but couldn't find the user you're looking for.",
      });
    }

    const userData = req.body;

    if (!(userData.fullname && userData.email && userData.phone_number)) {
      return res.status(400).json({
        message:
          "User update incomplete! 🚧📝 Oops! It looks like some dance moves were missing during the update! Don't worry, though. We'll find those moves and get your user profile back in sync with the disco rhythm! 🕺🎶",
      });
    }

    await User.update(
      {
        fullname: userData.fullname,
        email: userData.email,
        phone_number: userData.phone_number,
      },
      {
        where: { id: userId },
      }
    );

    res.status(200).json({
      message:
        "User successfully updated! ✨📝 The disco magic worked its charm! Your user profile has been polished and is ready to shine on Discotix! 💃🌟",
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(400).json({
      message:
        "User update incomplete! 🚧📝 Uh-oh! It seems like some dance moves went missing during the update! Don't worry, though. We'll find those moves and get your user profile back in sync with the Discotix rhythm! 🕺🎶",
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "User not found! 😕🔍 We searched high and low, but couldn't find the user you're looking for. They must have slipped off the disco radar. Keep grooving and try again with a different ID! 🕺💃",
      });
    }

    const userData = await User.destroy({
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      data: userData,
      message:
        "User deleted successfully! 👋😱 Farewell, party animal! Hope you had a blast on the Discotix express! 🎉🕺💃",
    });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return res.status(400).json({
      message:
        "Failed to delete user. 😔🚫 We encountered an issue while trying to delete the user. The disco party is having a hard time saying goodbye. Shake it off, try again, and let the disco beats guide you to a successful deletion! 🎶👋",
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({
        message:
          "User not found! 😕🔍 We searched high and low, but couldn't find the user you're looking for.",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message:
          "Oops! Username or password not found! 😕🚫 It seems like your disco credentials are offbeat. Double-check your username and password combination, and get ready to groove with the right credentials! 💃🔑",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    res.status(200).json({ token });
  } catch (error) {
    console.error("User login failed:", error);
    res.status(500).json({
      message:
        "User login failed. 😔🔐 Uh-oh! Your disco credentials didn't match the beats of the dance floor. Double-check your username and password combination, step back into the groove, and try again! 💃🎶",
    });
  }
};

// Setting user
exports.settingUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found! 😕🔍 We searched high and low, but couldn't find the user you're looking for.",
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Setting user failed:", error);
    res.status(500).json({
      message:
        "Failed to fetch user. 😔🚫 We encountered an issue while trying to fetch the user. The disco connection seems to be momentarily interrupted. Shake it off, try again, and let the rhythm of the disco flow through! 🎶💃",
    });
  }
};
