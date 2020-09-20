const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

// callback route for goole resdirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

// logout route
router.get('/logout', (req, res) => {
  // handle passport
  req.logout();
  res.redirect('/');
});

module.exports = router;
