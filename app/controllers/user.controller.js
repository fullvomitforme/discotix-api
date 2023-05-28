const db = require("../models/index.model");
const User = db.user;
const { hashPassword } = require("../utility/hashUtils");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to fetch users. Error: ${error.message}` });
  }
};

exports.getUserById = async (req, res) => {
  const userId = +req.params.id;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("We couldn't find any user with that ID");
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(404).json({
      message:
        "User search failed! 😔🔍 Oops! We couldn't find any user with that ID. They must have slipped out of the disco! Keep searching, and don't give up! 🕵️‍♂️💃",
    });
  }
};

exports.createUser = async (req, res) => {
  const firstname = req.body.first_name;
  const lastname = req.body.last_name;
  const fullname = firstname + " " + lastname;
  const newUser = {
    fullname: fullname,
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
  };

  const existUser = await User.findOne({
    where: { username: newUser.username },
  });

  if (existUser) {
    return res
      .status(400)
      .json({
        message:
          "Oops! Username already exists! 😕🚫 Choose a unique username and let your disco identity shine! 💃✨",
      });
  }

  try {
    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;

    const createUser = await User.create(newUser);
    res.status(200).json({
      data: createUser,
      message:
        "User added successfully! 🎉🎥 Welcome aboard the Discotix express! Get your popcorn ready and prepare for an epic movie marathon! 🍿🎬",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
        message: "User not found",
      });
    }

    const userData = req.body;

    if (!(userData.fullname && userData.email && userData.phone_number)) {
      throw new Error("User update incomplete");
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
    res.status(400).json({
      message:
        "User update incomplete! 🚧📝 Uh-oh! It seems like some dance moves went missing during the update! Don't worry, though. We'll find those moves and get your user profile back in sync with the Discotix rhythm! 🕺🎶",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
    }

    const userData = await User.destroy({
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      message:
        "User deleted successfully! 👋😱 Farewell, party animal! Hope you had a blast on the Discotix express! 🎉🕺💃",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
