const productCategory = require("../../model/product-category.model");
const createTreeHelepr = require("../../helpers/createTree");

// [GET] /admin/product-category
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }

    const records = await productCategory.find(find);

    const newRecords = createTreeHelepr.tree(records);
    console.log(newRecords)

    res.render('admin/pages/product-category/index.pug', {
        title: 'Product category',
        records: newRecords
});
}


// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
  const find = { deleted: false };

// treeeee

const records = await productCategory.find(find);

const newRecords = createTreeHelepr.tree(records);


  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords
  });
};


// [POST]/admin/product-category/create
module.exports.createPOST = async (req, res ) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    req.body.position = 1
  }
  
  const newProductCategory = new productCategory(req.body);
  await newProductCategory.save();
  res.redirect("/admin/products-category");
}


// [GET]/admin/product-category/edit/:id
module.exports.edit = async (req, res ) => {
  const find = { deleted: false };


const records = await productCategory.find(find);

const newRecords = createTreeHelepr.tree(records);

const record = await productCategory.findOne({_id: req.params.id})
  res.render("admin/pages/product-category/edit.pug", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    records: newRecords,
    record: record,
    id: req.params.id
  });
}

// [POST]/admin/product-category/edit/:id
module.exports.editPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  }
  await productCategory.updateOne({_id: req.params.id}, req.body);
  res.redirect(req.headers.referer);
};
