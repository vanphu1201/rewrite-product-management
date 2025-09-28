const Product = require("../../model/products.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }

    const products = await Product.find({});

  res.render('admin/pages/products/index.pug', {
    title: 'Products',
    products: products});
}