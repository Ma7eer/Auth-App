// defines your app routes and their logic here
const routes = {
  'root': (req, res) => {
    res.render('pages/home');
  },
  'signUp': (req, res) => {
    res.render('pages/signIn');
  },
  'logIn': (req, res) => {
    res.render('pages/logIn');
  },
  'profile': (req, res) => {
    res.render('pages/profile');
  }
};

module.exports = routes;