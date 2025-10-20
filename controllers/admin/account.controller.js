const Role = require("../../model/role.model");
const Account = require("../../model/account.model");
const md5 = require('md5');


// [GET] /admin/accounts
module.exports.index = async(req, res) => {
    const records = await Account.find({deleted: false});
    const roleNames = [];

    for (const item of records) {
        const role = await Role.findOne({_id: item.role_id});
        roleNames.push(role.title)
    }

    res.render('admin/pages/accounts/index.pug', {
        title: 'Accounts',
        records: records,
        roleNames: roleNames
    });
}


// [GET] /admin/accounts/create
module.exports.create = async(req, res) => {
    const roles = await Role.find({deleted: false});
    res.render('admin/pages/accounts/create.pug', {
        title: 'Create accounts',
        roles: roles
});
}

// [POST] /admin/accounts/create
module.exports.createPost = async(req, res) => {
    req.body.password = md5(req.body.password);
    const newAccount = new Account(req.body);
    await newAccount.save();

    req.flash("success", "Tạo tài khoản thành công");
    res.redirect("/admin/accounts")
}

// [POST] /admin/accounts/changeStatus/:id/:status
module.exports.changeStatus = async(req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await Account.updateOne({_id: id}, {status: status});

    res.redirect(req.headers.referer);
}