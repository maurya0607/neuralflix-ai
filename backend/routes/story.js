const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Middleware to protect routes
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

// 1. Create (Save) newly generated story
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { name, dream, struggles, script } = req.body;
    
    const newStory = await Story.create({
      userId: req.user._id,
      protagonistName: name,
      dream,
      struggles,
      generatedScript: script
    });

    res.status(201).json(newStory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save story' });
  }
});

// 2. Read (Get) all stories for logged in user
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// 3. Delete a story
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!story) return res.status(404).json({ error: 'Story not found' });
    res.json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

module.exports = router;
