const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/role.controller");


route.get('/', controller.roles);

route.get('/create', controller.create);

route.post('/create', controller.createPost);

route.get('/edit/:id', controller.edit);

route.post('/edit/:id', controller.editPost);

route.get('/delete/:id', controller.delete);

route.get('/permissions', controller.permissions);

route.post('/permissions', controller.permissionsPost);

module.exports = route;