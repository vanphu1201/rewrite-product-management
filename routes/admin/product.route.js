const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/product.controller");

route.get('/', controller.index);

route.post('/change-status/:id/:status', controller.changeStatus);

route.post('/change-multi', controller.changMulti);

module.exports = route;