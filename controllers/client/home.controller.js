const Product = require("../../model/products.model.js");

// [GET] /
module.exports.index = async (req, res) => {

    // Lấy anh sách sản phẩm nổi bật
    const find = {
        deleted: false,
        status: "active",
        featured: "1"
    }

    const productsFeatured = await Product.find(find).limit(3);

    const newProductsFeatured = productsFeatured.map( product => {
        product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        return product;
    });
    // Kết thúc lấy danh sách sản phẩm nổi bật


    // Lấy anh sách sản phẩm mới
    const productsNew = await Product.find({
        deleted: false,
        status: "active",
    }).limit(6).sort({position: "desc"});

    const newProductsNew = productsNew.map( product => {
        product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        return product;
    })
    // Kết thúc lấy anh sách sản phẩm mới


    res.render('client/pages/home/index.pug', {
        title: 'Home',
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
}