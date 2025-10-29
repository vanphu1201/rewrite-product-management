const Product = require("../../model/products.model.js");

// [GET] /
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status: "active",
        featured: "1"
    }

    const products = await Product.find(find).limit(3);

    const newProducts = products.map( product => {
        product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        return product
    })

    res.render('client/pages/home/index.pug', {
        title: 'Home',
        products: newProducts
    });
}