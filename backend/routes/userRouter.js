const express = require('express');
const User = require('../schemas/user'); // Adjust path if necessary

const router = express.Router();
const crypto = require('crypto');

const bcrypt = require('bcryptjs');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, role } = req.body;

  // Generate email based on name
  const email = `${name.replace(/\s+/g, '').toLowerCase()}@company.com`;

  // Generate a random password
  const plainPassword = Math.random().toString(36).slice(-8);

  // Hash the password with bcrypt
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const newUser = await user.save();
    res.status(201).json({
      user: newUser,
      plainPassword, // This can be removed in production; shared for testing purposes
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
