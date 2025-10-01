// dotenv
require('dotenv').config();
// end dotenv

const express = require('express');

// body parse
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// end body parse

const app = express();
const port = process.env.PORT;
// method overwrite
app.use(methodOverride('X-HTTP-Method-Override'));
// end method overwrite


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// end parse application/x-www-form-urlencoded

const database = require("./configs/database");

// pug
app.set('views', './views');
app.set('view engine', 'pug');
// end pug

// static public file
app.use(express.static('public'));
// end static public file

//route
const Route = require("./routes/client/index");
const RouteAdmin = require("./routes/admin/index.router");
// end route

// database
database();
// end database

// route
Route(app);
RouteAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
