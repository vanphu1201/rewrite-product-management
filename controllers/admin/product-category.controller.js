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
module.exports.create = async (req, res) => {
  const find = { deleted: false };

function createTree(arr, parentId = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentId) {
      const newItem = item;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

const records = await productCategory.find(find);

const newRecords = createTree(records);


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

  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  }

const records = await productCategory.find(find);

const newRecords = createTree(records);
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
