const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// --- Local Authentication --- //
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: 'local'
    });

    // Logging them in via session immediately after signup
    req.login(user, function(err) {
      if (err) return next(err);
      return res.status(201).json({ message: "Signup successful", user });
    });
    
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });
    if (user.authProvider !== 'local') return res.status(400).json({ error: `Please log in using your ${user.authProvider} account.`});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    req.login(user, function(err) {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
});

router.get('/me', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Helper to get frontend URL dynamically
const getFrontendURL = (req) => {
  return process.env.FRONTEND_URL || `http://${req.hostname}:5173`;
};

// --- Google Authentication --- //
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback when Google redirects back
router.get('/google/callback', (req, res, next) => {
  const frontendURL = getFrontendURL(req);
  passport.authenticate('google', { failureRedirect: `${frontendURL}/login` })(req, res, () => {
    // Successful authentication
    res.redirect(`${frontendURL}/`);
  });
});

// --- GitHub Authentication --- //
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback when GitHub redirects back
router.get('/github/callback', (req, res, next) => {
  const frontendURL = getFrontendURL(req);
  passport.authenticate('github', { failureRedirect: `${frontendURL}/login` })(req, res, () => {
    // Successful authentication
    res.redirect(`${frontendURL}/`);
  });
});

module.exports = router;
