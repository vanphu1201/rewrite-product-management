// validate
const validate = require("../../validates/admin/auth.validate");
// end validate

const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/auth.controller");


route.get('/login', controller.login);

route.post(
    '/login',
    validate.loginPost,
    controller.loginPost);

route.get('/logout', controller.logout);

module.exports = route;