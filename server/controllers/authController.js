const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id name'); //  fetch only _id and name
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
};
