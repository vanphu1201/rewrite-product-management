const Product = require("../../model/products.model.js");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status: "active"
    }

    const products = await Product.find({});

    const newProducts = products.map( product => {
        product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        return product
    })

    res.render('client/pages/products/index.pug', {
        title: 'Products',
        products: newProducts
    });
}


//[GET] products/detail/:slug
module.exports.detail = async (req, res) => {
    const productDetail = await Product.findOne({slug: req.params.slug});
    res.render('client/pages/products/detail.pug', {
        product: productDetail
    });
}

