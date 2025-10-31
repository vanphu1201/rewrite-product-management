const Cart = require("../../model/cart.model");

module.exports.cart = async (req, res, next) => {
    if (!req.cookies.cartId) {

        const cart = new Cart();
        await cart.save();

        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + 1000*60*60*24*365), httpOnly: true });
        
    } else {
        const cart = await Cart.findOne({_id: req.cookies.cartId});
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        res.locals.miniCart = cart;
        console.log(res.locals.miniCart)
    }
    next();
}