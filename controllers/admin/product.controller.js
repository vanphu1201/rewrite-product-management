const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
const formSearchHelper = require("../../helpers/formSearch.helper");
const paginationHelper = require("../../helpers/pagination.helper");

// [GET]/admin/products
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
  const countProducts = await Product.countDocuments(find);
  const paginationObject = paginationHelper(req.query, countProducts);
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

// [POST]/admin/products/change-multi
module.exports.changMulti = async (req, res ) => {
  const type = req.body.type;
  const ids = req.body.ids.split("-");
  await Product.updateMany({_id: {$in: ids}}, {status: type})
  res.redirect(req.headers.referer);
}

// [POST]/admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res ) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({_id: id}, {status: status})
  res.redirect(req.headers.referer);
}