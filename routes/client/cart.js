const express = require("express");
const route = express.Router();

const controller = require("../../controllers/client/cart.controller");

route.post("/add/:id", controller.addPost);

route.get("/", controller.index);

route.get("/change-quantity/:productId/:quantity", controller.changeQuantity);

route.get("/delete/:productId", controller.delete);

module.exports = route;