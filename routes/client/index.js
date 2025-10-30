const homeRoute = require("./home");
const productsRoute = require("./products");
const searchRoute = require("./search");

const subMenu = require("../../middlewares/client/category");

module.exports = (app) => {
    app.use(subMenu.category);

    app.use('/', homeRoute);

    app.use('/products', productsRoute);
    
    app.use("/search", searchRoute)
}