const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});

    for (const product of cart.products) {
        const productInfo = await Product.findOne({_id: product.product_id}).select("thumbnail title slug price discountPercentage");

        product.priceNew = productHelper.newPriceProduct(productInfo)

        product.productInfo = productInfo;

        product.totalPrice = product.quantity * product.priceNew;
    }

    cart.totalPrice = cart.products.reduce((sum, product) => sum + product.totalPrice, 0);

    res.render("client/pages/checkout/index.pug", {
        title: "Check out",
        cart: cart
    })
}