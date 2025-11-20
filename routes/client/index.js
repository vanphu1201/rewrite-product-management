const homeRoute = require("./home");
const productsRoute = require("./products");
const searchRoute = require("./search");
const cartRoute = require("./cart");
const checkoutRoute = require("./checkout");
const userRoute = require("./user");
const chatRoute = require("./chat");
const UsersRoute = require("./users");



const subMenu = require("../../middlewares/client/category");
const cartMiddleware = require("../../middlewares/client/cart");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingsGeneralMiddleware = require("../../middlewares/client/settings-general.middleware");
const authMiddleware = require("../../middlewares/client/auth.middleware");


module.exports = (app) => {
    app.use(subMenu.category);

    app.use(cartMiddleware.cart);

    app.use(userMiddleware.user);

    app.use(settingsGeneralMiddleware.settingsGeneral);

    app.use('/', homeRoute);

    app.use('/products', productsRoute);
    
    app.use("/search", searchRoute);

    app.use("/cart", cartRoute);

    app.use("/checkout", checkoutRoute);

    app.use("/user", userRoute);

    app.use("/chat", authMiddleware.requireAuth, chatRoute);

    app.use("/users", authMiddleware.requireAuth, UsersRoute);

}