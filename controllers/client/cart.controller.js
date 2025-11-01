const Cart = require("../../model/cart.model");
const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [POST] /cart/add/:id
module.exports.addPost = async (req, res) => {
    const productId = req.params.id;
    const cartId = req.cookies.cartId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({_id: cartId});
    
    const existProductInCart = cart.products.find(item => item.product_id == productId);

    if (existProductInCart) {
        const newQuantity = existProductInCart.quantity + quantity;
        await Cart.updateOne({_id: cartId, "products.product_id": productId}, {$set: {"products.$.quantity": newQuantity}});
    } else {
        await Cart.updateOne({_id: cartId}, {$push: {products: {
            product_id: productId,
            quantity: quantity
        }}})
    }

    req.flash("success", "Đặt hàng thành công!")

    res.redirect(req.headers.referer);
}


// [GET] /cart
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

    res.render("client/pages/cart/index.pug", {
        title: "Cart",
        cart: cart
    })
}

// [GET] /cart/change-quantity/:productId/:quantity
module.exports.changeQuantity = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    const cartId = req.cookies.cartId;

    await Cart.updateOne({_id: cartId, "products.product_id": productId}, {$set: {"products.$.quantity": quantity}});

    res.redirect(req.headers.referer);
}