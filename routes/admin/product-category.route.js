const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/product-category.controller");

route.get('/', controller.index);

route.get('/create', controller.create);

module.exports = route;