const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });


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
    controller.createPOST
);

route.get('/edit/:id', controller.edit);

route.post('/edit/:id', 
    upload.single('thumbnail'), 
    controller.editPOST
);

module.exports = route;