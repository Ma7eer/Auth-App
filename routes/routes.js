const isLoggedIn = require('../middlewares/index').isLoggedIn;
let isUserLoggedIn = false;
let path = {
  'Sign up': '/signup',
  'log in': '/login',
  'Profile': '/profile',
  'log out': '/logout'
};

const loggedInStatus = (req, res, next) => {
  isUserLoggedIn = !isUserLoggedIn;
  next();
}
// app/routes.js
module.exports = function (app, passport) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function (req, res) {
    res.render('pages/home', {
      isUserLoggedIn,
      path
    }); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/logIn', {
      isUserLoggedIn,
      path,
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', loggedInStatus, passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('pages/signUp', {
      isUserLoggedIn,
      path,
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', loggedInStatus, passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('pages/profile', {
      user: req.user, // get the user out of session and pass to template
      message: `Welcome ${req.user.local.username}!`,
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

