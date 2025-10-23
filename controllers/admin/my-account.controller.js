const Account = require("../../model/account.model");
const md5 = require("md5");
// [GET] /admin/my-account
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        user: res.locals.user
    })
}


//[GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        user: res.locals.user
    })
}

// [POST] /admin/my-account/edit
module.exports.editPost = async (req, res) => {
    const id = res.locals.user.id;
    const emailExist = await Account.findOne({
        _id: {$ne: id},
        deleted: false,
        email: req.body.email
    });
    if (emailExist) {
        req.flash("danger", `Email ${req.body.email} đã tồn tại!`);
    } else {
        if (req.body.password == "") {
            delete req.body.password;
        } else {
            req.body.password = md5(req.body.password);
        }
        await Account.updateOne({_id: id}, req.body);
    }
    res.redirect(req.headers.referer);
}