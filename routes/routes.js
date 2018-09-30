const middleware = require('../middlewares');
let isUserLoggedIn = false;
let path = {
  'Sign up': '/signup',
  'log in': '/login',
  'Profile': '/profile',
  'log out': '/logout'
};

// app/routes.js
module.exports = function (app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function (req, res) {
    res.render('pages/home', {
      isUserLoggedIn,
      path,
      message: '',
      user: req.user
    }); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login',middleware.isNotLoggedIn, function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/logIn', {
      isUserLoggedIn,
      path,
      message: req.flash('loginMessage'),
      user: req.user
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup',middleware.isNotLoggedIn , function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/signUp', {
      isUserLoggedIn,
      path,
      message: req.flash('signupMessage'),
      user: req.user
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile',middleware.isLoggedIn, function (req, res) {
    res.render('pages/profile', {
      user: req.user, // get the user out of session and pass to template
      message: req.flash('loginMessage', `Welcome ${req.user.local.username}!`),
      isUserLoggedIn,
      path
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    isUserLoggedIn = false;
    res.redirect('/');
  });
};