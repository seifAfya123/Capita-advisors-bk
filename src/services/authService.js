// services/authService.js
const User = require("../models/User"); // Mongoose/Sequelize/etc.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Password");
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET
    // { expiresIn: '1h' }
  );

  return token;
};

const register = async ({ email, password, name }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  return await user.save();
};

module.exports = { login, register };
