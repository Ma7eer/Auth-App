const express = require('express'),
  app = express(),
  bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* use static files */
app.use(express.static(__dirname + '/public'));

/* set view engine to ejs */
app.set('view engine', 'ejs');

/* PORT is set on package.json file under config */
const PORT = process.env.npm_package_config_port || 3000;

app.get('/', (req, res) => {
  let world = 'world!'
  res.render('pages/home', {
    world: world
  });
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));