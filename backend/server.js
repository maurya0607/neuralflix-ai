const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
};

// const corsOptions = {
//   origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
//   credentials: true, // required to pass cookies/sessions for OAuth
// };
app.use(cors(corsOptions));
app.use(express.json());

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'weboreel_secret_key_123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Initialize Passport
require('./passportSetup'); // Import our strategy configuration
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
const URI = process.env.MONGO_URI || "mongodb://localhost:27017/weboreel_db";
mongoose.connect(URI)
  .then(() => console.log('Successfully connected to MongoDB '))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('VishwaNova AI Backend is Running and Healthy!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/story', require('./routes/story'));
app.use('/api/ai', require('./routes/ai'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
