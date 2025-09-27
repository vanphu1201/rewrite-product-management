const homeRoute = require("./home");
const productsRoute = require("./products");

module.exports = (app) => {
    app.use('/', homeRoute);

    app.use('/products', productsRoute);
}