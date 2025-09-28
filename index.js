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
// end route

// database
database();
// end database


Route(app);

app.get('/admin/dashboard', (req, res) => {
  res.render('admin/pages/dashboard/index.pug', { title: 'Dashboard', message: 'Trang tong quan' });
});

app.get('/admin/products', (req, res) => {
  res.render('admin/pages/products/index.pug', { title: 'Products', message: 'Trang quan ly san pham' });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
