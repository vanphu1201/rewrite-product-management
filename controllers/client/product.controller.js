const Product = require("../../model/products.model.js");
const ProductCategory = require("../../model/product-category.model.js");

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


//[GET] products/detail/:slugProduct
module.exports.detailProduct = async (req, res) => {
    const productDetail = await Product.findOne({slug: req.params.slugProduct});

    productDetail.priceNew = (productDetail.price * (100 - productDetail.discountPercentage) / 100).toFixed(0);

    res.render('client/pages/products/detail.pug', {
        product: productDetail
    });
}


//[GET] products/detail/:slugCategory
module.exports.detailCategory = async (req, res) => {
    const category = await ProductCategory.findOne({slug: req.params.slugCategory});
    const getSubCategory = async (parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false,
        });

        let allSub = [...subs];

        for (const sub of subs) {
            const childs = await getSubCategory(sub.id);
            allSub = allSub.concat(childs);
        }

        return allSub;
    };

    const subCategory = await getSubCategory(category.id);
    
    const listSubCategoryId = subCategory.map(item => item.id);
    
    console.log(listSubCategoryId)
    const products = await Product.find({
        product_category_id: {$in: [category,...listSubCategoryId]},
        deleted: false,
        status: "active"
    })
    
    res.render('client/pages/products/index.pug', {
        products: products
    });
}

