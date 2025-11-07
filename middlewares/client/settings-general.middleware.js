const SettingsGeneral = require("../../model/settings-general.model");

module.exports.settingsGeneral = async (req, res, next) => {
    const setiingsGeneral = await SettingsGeneral.findOne({});
    if (setiingsGeneral) {
        res.locals.settingsGeneral = setiingsGeneral
    }
    next();
}