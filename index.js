// dotenv
require('dotenv').config();
// end dotenv

const express = require('express');
const app = express();
const port = process.env.PORT;


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


Route(app);
RouteAdmin(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
