const express = require("express");
const route = express.Router();

const registerValidate = require("../../validates/client/register.validate");
const forgotPasswordValidate = require("../../validates/client/forgot-password.validate");
const otpValidate = require("../../validates/client/otp.validate");
const resetValidate = require("../../validates/client/reset-password.validate");



const controller = require("../../controllers/client/user.controller");

route.get("/register", controller.register);

route.post("/register", registerValidate.registerPost, controller.registerPost);

route.get("/login", controller.login);

route.post("/login", registerValidate.loginPost, controller.loginPost);

route.get("/logout", controller.logout);

route.get("/password/forgot", controller.forgotPassword);

route.post("/password/forgot", forgotPasswordValidate.forgotPasswordPost, controller.forgotPasswordPost);

route.get("/password/otp/:email", controller.otp);

route.post("/password/otp/:email", otpValidate.otpPost, controller.otpPost);

route.get("/password/reset", controller.reset);

route.post("/password/reset", resetValidate.resetPost, controller.resetPost);




module.exports = route;