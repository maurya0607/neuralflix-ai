const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'DUMMY_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_SECRET',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id, authProvider: 'google' });
        
        if (!user) {
          // Fallback to check if they signed up with same email using Local.
          // For simplicity in a tutorial app, we just create a new Google user.
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            authProvider: 'google',
            providerId: profile.id
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Configure GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || 'DUMMY_ID',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'DUMMY_SECRET',
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails ? profile.emails[0].value : `${profile.username}@github.com`;
        let user = await User.findOne({ providerId: profile.id, authProvider: 'github' });
        
        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: email,
            authProvider: 'github',
            providerId: profile.id
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
