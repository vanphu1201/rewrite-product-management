const productCategory = require("../../model/product-category.model");
const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
    const category = await productCategory.find({
        deleted: false,
        status: "active"
    })
    const tree = createTreeHelper.tree(category);

    res.locals.layoutSubMenu = tree;
    next();
}