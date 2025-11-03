const md5 = require("md5");

const User = require("../../model/user.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        title: "register"
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