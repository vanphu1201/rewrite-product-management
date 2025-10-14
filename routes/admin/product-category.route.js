const multer  = require('multer');
const upload = multer();

// upload cloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end upload cloud

// validate
const validate = require("../../validates/admin/product.validate");
// end validate

const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/product-category.controller");

route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', 
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPOST,
    controller.createPOST
);

module.exports = route;