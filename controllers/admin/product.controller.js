const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
const formSearchHelper = require("../../helpers/formSearch.helper");

module.exports.index = async (req, res) => {

  let find = {
      deleted: false
  }

  // filter status
  const filterStatus = filterStatusHelper(req.query, find);
  find = filterStatus.find;
  // end filter status

  // form search
  const formSearch = formSearchHelper(req.query, find);
  // end form search

  // pagination
  const paginationObject = {
    currentPage: 1,
    limit: 4
  }

  const countProducts = await Product.countDocuments(find);
  paginationObject.totalPage = Math.ceil(countProducts / paginationObject.limit);
  paginationObject.currentPage = parseInt(req.query.page);
  paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limit;


  // end pagination

  
  const products = await Product
    .find(find)
    .limit(paginationObject.limit)
    .skip(paginationObject.skip);

  res.render('admin/pages/products/index.pug', {
    title: 'Products',
    products: products,
    filterStatus: filterStatus.filterStatus,
    keyword: formSearch,
    paginationObject: paginationObject
  });
}