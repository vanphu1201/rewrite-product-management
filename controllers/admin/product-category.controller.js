const productCategory = require("../../model/product-category.model");

// [GET] /admin/product-category
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }

    const records = await productCategory.find(find);

    res.render('admin/pages/product-category/index.pug', {
        title: 'Product category',
        records: records
});
}


// [GET] /admin/product-category/create
module.exports.create = async(req, res) => {
    const find = {
        deleted: false
    }

    const records = await productCategory.find(find);
    res.render('admin/pages/product-category/create.pug', {
    title: 'Create product-category',
    records: records
  });
}