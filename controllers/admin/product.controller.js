const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");

module.exports.index = async (req, res) => {

  const find = {
      deleted: false
  }


  const filterStatus = filterStatusHelper(req.query, find);

  
  const products = await Product.find(find);

  res.render('admin/pages/products/index.pug', {
    title: 'Products',
    products: products,
    filterStatus: filterStatus
  });
}