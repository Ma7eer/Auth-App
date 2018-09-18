const express = require('express');
const router = express.Router();

/* root route*/
router.get('/', (req, res) => {
  res.render('pages/home');
});

/* sign in */
router.get('/signin', (req, res) => {
  res.render('pages/signIn');
});

/* log in */
router.get('/login', (req, res) => {
  res.render('pages/logIn');
});

/* profile page */
router.get('/profile/:username', (req, res) => {
  res.render('pages/profile');
});

module.exports = router;