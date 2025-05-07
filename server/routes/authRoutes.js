
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    console.log('Registration attempt:', { name, email, role });

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists with this email
    let existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('Registration failed: Email already exists');
      return res.status(400).json({ message: 'Email already in use. Please try logging in or use a different email.' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // Will be hashed in the pre-save hook
      role
    });

    await user.save();
    console.log('User saved successfully with ID:', user._id);

    // Create token payload
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return user without password and token
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    console.log('Registration successful, returning user:', userResponse);
    res.status(201).json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration: ' + error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    console.log('Login attempt:', { email, role });

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(400).json({ message: 'User not found. Please check your email or register for an account.' });
    }

    // Check if role matches
    if (user.role !== role) {
      console.log('Login failed: Role mismatch');
      return res.status(400).json({ 
        message: `You registered as a ${user.role}, but you're trying to log in as a ${role}. Please select the correct role.`
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Invalid password');
      return res.status(400).json({ message: 'Invalid password. Please try again.' });
    }

    // Create token payload
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return user without password and token
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    console.log('Login successful, returning user:', userResponse);
    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login: ' + error.message });
  }
});

// Get current user
router.get('/user', auth, async (req, res) => {
  try {
    // Find user by id
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
