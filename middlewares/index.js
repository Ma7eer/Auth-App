module.exports = {
  // route middleware to make sure a user is logged in
  isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
  },
  // route middleware to make sure a user not logged in
  isNotLoggedIn(req, res, next) {

    // if user is authenticated in the session, redirect to home page
    if (req.isAuthenticated()) {
      // if they aren't redirect carry on
      return res.redirect('/');
    }

    next();
  }
};