const Role = require("../../model/role.model");

// [GET] /admin/roles
module.exports.roles = async(req, res) => {
    const find = {
        deleted: false
    }

    const records = await Role.find(find);

    res.render('admin/pages/roles/index.pug', {
        title: 'Roles',
        records: records
});
}


// [GET] /admin/roles/create
module.exports.create = async(req, res) => {
    res.render('admin/pages/roles/create.pug', {
        title: 'Create role',
});
}


// [POST] /admin/roles/create
module.exports.createPost = async(req, res) => {
    const newRole = new Role(req.body);
    await newRole.save();

    res.redirect("/admin/roles");
}


// [GET] /admin/roles/edit/:id
module.exports.edit = async(req, res) => {
    const id = req.params.id;
    const record = await Role.findOne({_id: id})
    res.render('admin/pages/roles/edit.pug', {
        title: 'Edit role',
        id: id,
        record: record
});
}


// [POST] /admin/roles/edit/:id
module.exports.editPost = async(req, res) => {
    const id = req.params.id;
    await Role.updateOne({_id: id}, req.body);

    res.redirect(req.headers.referer);
}


// [DELETE] /admin/roles/delete/:id
module.exports.delete = async(req, res) => {
    const id = req.params.id;
    await Role.updateOne({_id: id}, {deleted: true});

    res.redirect(req.headers.referer);
}



// [GET] /admin/roles/permissions
module.exports.permissions = async(req, res) => {
    const find = {
        deleted: false
    }

    const records = await Role.find(find);

    res.render('admin/pages/roles/permissons.pug', {
        title: 'Roles',
        records: records
    });
}


// [POST] /admin/roles/permissions
module.exports.permissionsPost = async(req, res) => {
    const dataPermissions = JSON.parse(req.body.permissions);
    for (const item of dataPermissions) {
        await Role.updateOne({_id: item.id}, {permissions: item.permisions});
    }

    res.redirect(req.headers.referer);
}