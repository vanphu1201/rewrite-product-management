const express = require("express");
const route = express.Router();

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/settings.controller");


route.get('/general', controller.general);

route.post(
    '/general',
    upload.single("logo"),
    uploadCloud.upload,
    controller.generalPost);


module.exports = route;