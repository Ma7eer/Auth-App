const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');

/* Show sign up form */
router.get('/signup', (req, res) => {
  res.render('pages/signUp');
});

/* post data to user page */
router.post('/signup', (req, res) => {
  let newUser = new User({
    username: req.body.name
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('pages/signUp');
    }
    passport.authenticate('local')(req, res, () => {
      return;
    });
  });

  res.render('pages/user', {
    name: req.body.name,
    imgUrl: `https://api.adorable.io/avatars/245/${req.body.name}.png`,
    date: new Date()
  });
});

module.exports = router;