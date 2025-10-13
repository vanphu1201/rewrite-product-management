// dotenv
require('dotenv').config();
// end dotenv

const path = require('path');

// express-flash
const flash = require('express-flash');
// end express-flash

const express = require('express');

// body parse
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// end body parse

// cookie-parse and express-section
const cookieParser = require('cookie-parser');
const session = require('express-session');
// cookie-parse and express-section

const app = express();
const port = process.env.PORT;

// express-flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end express-flash

// method overwrite
app.use(methodOverride('X-HTTP-Method-Override'));
// end method overwrite


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// end parse application/x-www-form-urlencoded

const database = require("./configs/database");

// pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
// end pug

// static public file
app.use(express.static(`${__dirname}/public`));
// end static public file

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tinyMCE

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
