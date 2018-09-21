const express = require('express');
const router = express.Router();

/* log in */
router.get('/login', (req, res) => {
  res.render('pages/logIn');
});

/* post data to user page */
router.post('/login', (req, res) => {
  res.render('pages/user', {name: req.body.name});
});

module.exports = router;