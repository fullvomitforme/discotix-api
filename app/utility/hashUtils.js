const bcrypt = require("bcrypt");

// Hash password using bcrypt
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

// Compare password with hashed password using bcrypt
const comparePassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
