const SettingsGeneral = require("../../model/settings-general.model")

// [GET] /admin/settings/general
module.exports.general = async(req, res) => {
    const settingGeneral = await SettingsGeneral.findOne({});
    res.render('admin/pages/settings/general.pug', {
        title: 'Settings general',
        settingGeneral: settingGeneral
    });
}


// [POST] /admin/settings/general
module.exports.generalPost = async(req, res) => {
    const count = await SettingsGeneral.countDocuments();
    if (count) {
        await SettingsGeneral.updateOne({}, req.body)
    } else {
        const settingGeneral = new SettingsGeneral(req.body);
        await settingGeneral.save();
    }

    res.redirect(req.headers.referer);
}