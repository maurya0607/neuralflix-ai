const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  protagonistName: {
    type: String,
    required: true,
  },
  dream: {
    type: String,
    required: true,
  },
  struggles: {
    type: String,
    required: true,
  },
  generatedScript: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Story', StorySchema);
