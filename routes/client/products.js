const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/product.controller");

route.get('/', controller.index);

route.get('/detail/:slugProduct', controller.detailProduct);

route.get('/:slugCategory', controller.detailCategory);

module.exports = route;