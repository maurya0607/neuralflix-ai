const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();

const app = express();

// Middleware — CORS whitelist for Vercel (prod) + any localhost port (dev)
const allowedOrigins = [
  process.env.FRONTEND_URL,      // e.g. https://vishvanoraai.vercel.app
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow: no origin (curl/Postman), any localhost port, or whitelisted origins
    if (
      !origin ||
      /^http:\/\/localhost:\d+$/.test(origin) ||
      /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/.test(origin) ||   // mobile hotspot
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/.test(origin) ||  // LAN
      allowedOrigins.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


// Session Middleware
const isProduction = process.env.NODE_ENV === 'production';
app.use(session({
  secret: process.env.SESSION_SECRET || 'weboreel_secret_key_123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: isProduction,         // HTTPS only in prod
    sameSite: isProduction ? 'none' : 'lax', // cross-origin cookies in prod
    httpOnly: true,
  }
}));

// Initialize Passport
require('./passportSetup'); // Import our strategy configuration
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/weboreel_db";
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

// Export app for Vercel serverless
module.exports = app;

// Start Server only when run directly (not via Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
  });
}


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const session = require('express-session');
// const passport = require('passport');

// dotenv.config();

// const app = express();

// // ✅ CORS (fixed + safe)
// const allowedOrigins = [
//   process.env.FRONTEND_URL, // e.g. https://your-frontend.vercel.app
// ].filter(Boolean);

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (
//       !origin ||
//       /^http:\/\/localhost:\d+$/.test(origin) ||
//       /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/.test(origin) ||
//       /^http:\/\/192\.168\.\d+\.\d+:\d+$/.test(origin) ||
//       allowedOrigins.includes(origin)
//     ) {
//       callback(null, true);
//     } else {
//       console.log("❌ CORS blocked:", origin);
//       callback(new Error(`CORS blocked for origin: ${origin}`));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());


// // ✅ Session (fixed for production)
// const isProduction = process.env.NODE_ENV === 'production';

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'weboreel_secret_key_123',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000,
//     secure: isProduction,          // true on Render (HTTPS)
//     sameSite: isProduction ? 'none' : 'lax',
//     httpOnly: true,
//   }
// }));

// // ✅ Passport
// require('./passportSetup');
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ MongoDB (fixed variable name)
// const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/weboreel_db";

// mongoose.connect(URI)
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB error:', err));


// // ✅ Health route
// app.get('/', (req, res) => {
//   res.send('VishwaNova AI Backend is Running 🚀');
// });

// // ✅ Routes (NO CHANGE — already correct)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/story', require('./routes/story'));
// app.use('/api/ai', require('./routes/ai'));

// // ✅ Export for Render/Vercel
// module.exports = app;


// // ✅ Start server (local only)
// if (require.main === module) {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// }