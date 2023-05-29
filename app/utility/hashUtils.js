const bcrypt = require("bcrypt");

// Hash password using bcrypt
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw new Error(
      "Error hashing password. 😔🔒 Uh-oh! We encountered an issue while trying to hash the password. The disco beats got tangled up. Let's fix it and ensure your password is securely encrypted for the dance floor! 🎶🔐"
    );
  }
};

// Compare password with hashed password using bcrypt
const comparePassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (err) {
    throw new Error(
      "Error comparing passwords. 😔🔐 Uh-oh! We encountered an issue while trying to compare the passwords. The disco authentication got out of sync. Let's troubleshoot and make sure the passwords match to keep the dance floor secure! 🎶💃"
    );
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
