const User = require('../models/users');
const generateToken = require('../utils/generateToken');
const { generateSecret, verifyToken } = require('../utils/twoFactorAuth');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExistEmail = await User.findOne({ email });
    if (userExistEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const userExistUsername = await User.findOne({ username });
    if (userExistUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


exports.login = async (req, res) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        if (user.twoFactorAuth) {
            if (verifyToken(user.twoFactorAuthSecret, token)) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                });
            } else {
                res.status(401).json({ message: 'Invalid 2FA token' });
            }
        } else {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

