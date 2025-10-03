const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.helper");
const formSearchHelper = require("../../helpers/formSearch.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const { now } = require("mongoose");

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
    .skip(paginationObject.skip)
    .sort({position: "asc"});

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
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({_id: {$in: ids}}, {status: "active"});
      req.flash('success', `Cập nhập thành công ${ids.length} sản phẩm`);
      res.redirect(req.headers.referer);
      break;
    case "inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
      req.flash('success', `Cập nhập thành công ${ids.length} sản phẩm`);
      res.redirect(req.headers.referer);
      break;
    case "delete":
      await Product.updateMany({_id: {$in: ids}}, {deleted: true});
      req.flash('danger', `Xóa thành công ${ids.length} sản phẩm`);
      res.redirect(req.headers.referer);
      break;
    case "change-position":
      for (let value of ids) {
        const [id, position] = value.split("-");
        await Product.updateOne({_id: id}, {position: parseInt(position)});
      }
      req.flash('success', `Thay đổi vị trí thành công ${ids.length} sản phẩm`);
      res.redirect(req.headers.referer);
      break;
    default:
      break
  }
}

// [POST]/admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res ) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({_id: id}, {status: status});
  req.flash('success', 'Cập nhập sản phẩm thành công');
  res.redirect(req.headers.referer);
}

// [DELETE]/admin/products/delete/:id
module.exports.deleteProduct = async (req, res ) => {
  const id = req.params.id;
  await Product.updateOne({_id: id}, {deleted: true});
  req.flash('danger', 'Xóa sản phẩm thành công');
  res.redirect(req.headers.referer);
}