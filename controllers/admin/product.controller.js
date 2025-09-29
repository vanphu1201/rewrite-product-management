const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
const formSearchHelper = require("../../helpers/formSearch.helper");

module.exports.index = async (req, res) => {

  const find = {
      deleted: false
  }

  // filter status
  const filterStatus = filterStatusHelper(req.query, find);
  // end filter status

  // form search
  const formSearch = formSearchHelper(req.query, find);
  // end form search

  
  const products = await Product.find(find);

  res.render('admin/pages/products/index.pug', {
    title: 'Products',
    products: products,
    filterStatus: filterStatus,
    keyword: formSearch
  });
}