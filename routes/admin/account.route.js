const multer  = require('multer');
const upload = multer();

// upload cloud
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// end upload cloud

// validate
const validate = require("../../validates/admin/account.validate");
// end validate

const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/account.controller");


route.get('/', controller.index);

route.get('/create', controller.create);

route.post('/create', 
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPOST,
    controller.createPost);

route.post('/changeStatus/:id/:status', controller.changeStatus);

module.exports = route;