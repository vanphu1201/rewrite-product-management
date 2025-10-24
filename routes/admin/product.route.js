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

const controller = require("../../controllers/admin/product.controller");

route.get('/', controller.index);

route.post('/change-status/:id/:status', controller.changeStatus);

route.post('/change-multi', controller.changMulti);

route.post('/delete/:id', controller.deleteProduct);

route.get('/create', controller.create);

route.post('/create', 
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPOST,
    controller.createPOST
);

route.get('/edit/:id', controller.edit);

route.post('/edit/:id', 
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPOST,
    controller.editPOST
);

route.get('/detail/:id', controller.detail);

route.get('/restore', controller.restore);

route.get('/restore/:id', controller.restorePost);

module.exports = route;