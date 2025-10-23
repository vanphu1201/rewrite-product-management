const multer = require("multer");
const upload = multer();

const validate = require("../../validates/admin/my-account.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/my-account.controller");

route.get("/", controller.index);

route.get("/edit", controller.edit);

route.post("/edit",
    upload.single("avatar"),
    uploadCloud.upload,
    validate.editPOST,
    controller.editPost);

module.exports = route