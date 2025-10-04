const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/product.controller");

route.get('/', controller.index);

route.post('/change-status/:id/:status', controller.changeStatus);

route.post('/change-multi', controller.changMulti);

route.post('/delete/:id', controller.deleteProduct);

route.get('/create', controller.create);

route.post('/create', controller.createPOST);

route.get('/edit/:id', controller.edit);

route.post('/edit/:id', controller.editPOST);

module.exports = route;