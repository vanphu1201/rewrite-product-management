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

  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // end sort
  
  const products = await Product
    .find(find)
    .limit(paginationObject.limit)
    .skip(paginationObject.skip)
    .sort(sort);

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
  req.flash('success', 'Xóa sản phẩm thành công');
  res.redirect(req.headers.referer);
}


// [GET]/admin/products/create
module.exports.create = async (req, res ) => {
  res.render('admin/pages/products/create.pug', {
    title: 'Create product'
  });
}

// [POST]/admin/products/create
module.exports.createPOST = async (req, res ) => {
  
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    req.body.position = 1
  }
  
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect("/admin/products");
}


// [GET]/admin/products/edit/:id
module.exports.edit = async (req, res ) => {
  const product = await Product.find({_id: req.params.id});
  res.render('admin/pages/products/edit.pug', {
    title: 'Edit product',
    id: req.params.id,
    product: product[0]
  });
}

// [POST]/admin/products/edit/:id
module.exports.editPOST = async (req, res ) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    req.body.position = 1;
  }
  
  await Product.updateOne({_id: req.params.id}, req.body);
  res.redirect("/admin/products");
}


// [GET]/admin/products/detail/:id
module.exports.detail = async (req, res) => {
  const productDetail = await Product.findOne({_id: req.params.id});
  console.log(productDetail)
  res.render('admin/pages/products/detail.pug', {
    product: productDetail
  })
}