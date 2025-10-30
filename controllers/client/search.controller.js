const Product = require("../../model/products.model");
const productHelper = require("../../helpers/product");

// [GET] /search?keyword=...
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    if (keyword) {
        const regex = new RegExp(keyword, "i");

        const products = await Product.find({title: regex});

        console.log(productHelper.newPriceProducts(products));

        res.render("client/pages/search/index.pug", {
            products: productHelper.newPriceProducts(products),
            keyword: keyword
        });
    }
}