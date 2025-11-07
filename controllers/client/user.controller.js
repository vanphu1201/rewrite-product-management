const md5 = require("md5");
const generateHelper = require("../../helpers/generate");

const nodemailer = require('nodemailer');

const User = require("../../model/user.model");
const ForgotPassword = require("../../model/forgot-password.model");
const Cart = require("../../model/cart.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        title: "Register"
    })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false,
        status: "active"
    });

    if (existEmail) {
        req.flash("danger", `Email ${req.body.email} đã tồn tại!`);
        res.redirect(req.headers.referer);
    } else {
        req.body.password = md5(req.body.password);
        
        const user = new User(req.body);
        await user.save();

        res.cookie("tokenUser", user.tokenUser);

        res.redirect("/");
    }
}


// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {
        title: "Login"
    })
}



// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if (!user) {
        req.flash("danger", `Email ${req.body.email} không tồn tại!`);
        res.redirect(req.headers.referer);
        return;
    }
    if (user.password !== md5(req.body.password)) {
        req.flash("danger", `Sai mật khẩu!`);
        res.redirect(req.headers.referer);
        return;
    }
    if (user.status == "inactive") {
        req.flash("danger", `Tài khoản đã bị khóa!`);
        res.redirect(req.headers.referer);
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    
    const cartUser = await Cart.findOne({user_id: user.id});
    if (cartUser) {
        res.cookie("cartId", cartUser.id);       
    } else {
        await Cart.updateOne({_id: req.cookies.cartId}, {user_id: user.id});
    }

    await Cart.deleteMany({
        $or: [
            { user_id: { $exists: false } },
            { user_id: null }
        ]
    });


    res.redirect("/");
}


// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");

    res.redirect("/");
}


// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        title: "Forgot password"
    })
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });
    
    if (!user) {
        req.flash("danger", `Email ${email} không tồn tại!`);
        res.redirect(req.headers.referer);
        return;
    }
    if (user.status == "inactive") {
        req.flash("danger", `Tài khoản đã bị khóa!`);
        res.redirect(req.headers.referer);
        return;
    }
    if (user) {
        const otp = generateHelper.generateRandomNumber(8);
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        }
        const forgotpassword = new ForgotPassword(objectForgotPassword);
        await forgotpassword.save();

        // Viết code gửi mã OTP ở đây
        const subject = "Mã OPT xác minh lấy lại mật khẩu";
        const html = `
            Mã OTP để lấy lại mật khẩu là <b>${otp}</b>
        `;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        // Configure the mailoptions object
        const mailOptions = {
            from: 'phu0348880746@email.com',
            to: email,
            subject: subject,
            html: html
        };

        // Send the email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(`Error:` + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.redirect(`/user/password/otp/${email}`);
    }
}


// [GET] /user/password/otp/:email
module.exports.otp = async (req, res) => {
    const email = req.params.email;
    res.render("client/pages/user/otp", {
        title: "OTP",
        email: email
    })
}


// [POST] /user/password/otp/:email
module.exports.otpPost = async (req, res) => {
    const forgotPassword = await ForgotPassword.findOne({email: req.params.email, otp: req.body.otp});
    if (!forgotPassword) {
        req.flash("danger", "Mã OTP không chính xác, vui lòng nhập lại!");
        res.redirect(req.headers.referer);
    } else {
        const user = await User.findOne({email: req.params.email, deleted: false});
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/user/password/reset");
    }
}



// [GET] /user/password/reset
module.exports.reset = async (req, res) => {
    res.render("client/pages/user/reset", {
        title: "Reset password",
    })
}



// [POST] /user/password/reset
module.exports.resetPost = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password != confirmPassword) {
        req.flash("danger", "Mật khẩu không khớp!");
        res.redirect(req.headers.referer);
    } else {
        await User.updateOne(
            {
                tokenUser: req.cookies.tokenUser
            }, 
            {
                password: md5(password)
            }
        );
        res.redirect("/");

    }
}