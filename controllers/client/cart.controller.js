const Cart = require("../../model/cart.model");

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