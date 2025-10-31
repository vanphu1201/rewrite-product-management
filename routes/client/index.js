const homeRoute = require("./home");
const productsRoute = require("./products");
const searchRoute = require("./search");
const cartRoute = require("./cart");

const subMenu = require("../../middlewares/client/category");
const cartMiddleware = require("../../middlewares/client/cart");

module.exports = (app) => {
    app.use(subMenu.category);

    app.use(cartMiddleware.cart);

    app.use('/', homeRoute);

    app.use('/products', productsRoute);
    
    app.use("/search", searchRoute);

    app.use("/cart", cartRoute);
}