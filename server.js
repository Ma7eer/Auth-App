// TODO: setup ejs
const express = require('express');
const app = express();

/* PORT is set on package.json file under config */
const PORT = process.env.npm_package_config_port;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));