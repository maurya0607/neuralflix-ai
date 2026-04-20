// const express = require('express');
// const router = express.Router();
// const Story = require('../models/Story');

// // Middleware to protect routes
// const ensureAuth = (req, res, next) => {
//   if (req.isAuthenticated()) return next();
//   res.status(401).json({ error: 'Unauthorized' });
// };

// // 1. Create (Save) newly generated story
// router.post('/', ensureAuth, async (req, res) => {
//   try {
//     const { name, dream, struggles, script } = req.body;
    
//     const newStory = await Story.create({
//       userId: req.user._id,
//       protagonistName: name,
//       dream,
//       struggles,
//       generatedScript: script
//     });

//     res.status(201).json(newStory);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to save story' });
//   }
// });

// // 2. Read (Get) all stories for logged in user
// router.get('/', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ userId: req.user._id }).sort({ createdAt: -1 });
//     res.json(stories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch stories' });
//   }
// });

// // 3. Delete a story
// router.delete('/:id', ensureAuth, async (req, res) => {
//   try {
//     const story = await Story.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
//     if (!story) return res.status(404).json({ error: 'Story not found' });
//     res.json({ message: 'Story deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete story' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// 🔥 Middleware to protect routes
const ensureAuth = (req, res, next) => {
  console.log("Auth Check:", {
    isAuth: req.isAuthenticated(),
    user: req.user
  });

  if (req.isAuthenticated() && req.user) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized - Please login' });
};


// ✅ 1. Create (Save) Story
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { name, dream, struggles, script } = req.body;

    // 🔥 Validation (basic)
    if (!name || !dream || !script) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newStory = await Story.create({
      // userId: req.user._id,
      userId: req.user?._id,
      protagonistName: name,
      dream,
      struggles,
      generatedScript: script
    });

    res.status(201).json(newStory);

  } catch (err) {
    console.error("Save Story Error:", err);
    res.status(500).json({ error: 'Failed to save story' });
  }
});


// ✅ 2. Get All Stories (Director's Archive)
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(stories);

  } catch (err) {
    console.error("Fetch Stories Error:", err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});


// ✅ 3. Delete Story
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ message: 'Story deleted successfully' });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: 'Failed to delete story' });
  }
});


module.exports = router;