const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const myAccountRoute = require("./my-account.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");


module.exports = (app) => {
    app.use('/admin/dashboard', authMiddleware.requireAuth, dashboardRoute);

    app.use('/admin/products', authMiddleware.requireAuth, productRoute);

    app.use('/admin/products-category', authMiddleware.requireAuth, productCategoryRoute);

    app.use('/admin/roles', authMiddleware.requireAuth, roleRoute);

    app.use('/admin/accounts', authMiddleware.requireAuth, accountRoute);

    app.use('/admin/auth', authRoute);

    app.use("/admin/my-account", authMiddleware.requireAuth, myAccountRoute);

}