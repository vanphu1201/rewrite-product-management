const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRoute);

    app.use('/admin/products', productRoute);

    app.use('/admin/products-category', productCategoryRoute);
}