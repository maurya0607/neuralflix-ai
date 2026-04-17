const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password might be empty if they log in via Google/GitHub
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'github'],
    default: 'local'
  },
  providerId: {
    type: String,
    // ID given by Google or GitHub
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
