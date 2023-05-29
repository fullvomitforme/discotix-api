const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message:
        "Missing token. 🔐🚫 Uh-oh! It seems like your disco pass is missing. You'll need a valid token to access the dance floor. Grab your token, join the party, and let's groove together! 💃🔑",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message:
        "Invalid token. 🚫😕 Oh no! Your disco pass is not valid. Please make sure you have a valid token to access the dance floor. Let's get the right moves and credentials to keep the disco vibes flowing! 💃🔑",
    });
  }
};
