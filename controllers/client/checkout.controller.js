const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const Order = require("../../model/order.model");

const productHelper = require("../../helpers/product");
const { use } = require("../../routes/client/checkout");

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


// [POST] /checout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    
    const userInfo = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
    }

    const products = [];

    const cart = await Cart.findOne({_id: cartId});
    for (const product of cart.products) {
        const productInfo = await Product.findOne({_id: product.product_id}).select("price discountPercentage");
        const productDetail = {
            product_id: product.product_id,
            price: productInfo.price,
            discountPercentage: productInfo.discountPercentage,
            quantity: product.quantity,
        }

        products.push(productDetail);
    }

    const objectOrder = {
        cart_id: cartId,
        userInfo,
        products
    }

    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne({_id: cartId}, {products: []});

    res.redirect(`/checkout/success/${order.id}`);

}


// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;

    const order = await Order.findOne({_id: orderId});
    
    for (const product of order.products) {
        const productInfo = await Product.findOne({_id: product.product_id}).select("thumbnail title");

        product.productInfo = productInfo;

        product.priceNew = productHelper.newPriceProduct(product);

        product.totalPrice = product.priceNew * product.quantity;
    }

    order.totalPrice = order.products.reduce((sum, product) => sum + product.totalPrice, 0)

    res.render("client/pages/checkout/success.pug", {
        title: "Ordering success",
        order: order
    })
}