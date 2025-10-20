const Account = require("../../model/account.model");
const md5 = require('md5');

// [GET] /admin/auth/login
module.exports.login = async(req, res) => {
    res.render('admin/pages/auth/login.pug', {
        title: 'Login',
    });
}


// [POST] /admin/auth/login
module.exports.loginPost = async(req, res) => {
    const user = await Account.findOne({
        email: req.body.email,
        password: md5(req.body.password)
    });
    if (user) {
        res.cookie("token", user.token);
        res.redirect(`/admin/dashboard`)
    } else {
        req.flash("danger", "Tài khoản không tồn tại!");
        res.redirect(`/admin/auth/login`)
    }
}

// [GET] /admin/auth/logout
module.exports.logout = async(req, res) => {
    res.clearCookie("token");
    res.redirect(`/admin/auth/login`)
}
