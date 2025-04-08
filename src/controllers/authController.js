const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const register = async (req, res) => {
    try {
      const user = await authService.register(req.body);
      console.log(user)
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports = { login ,register};
