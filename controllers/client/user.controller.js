const md5 = require("md5");

const User = require("../../model/user.model");

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

    res.redirect("/");
}


// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}