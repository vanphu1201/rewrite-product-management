const User = require("../../model/user.model");

module.exports.user = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            deleted: false,
            status: "active",
            tokenUser: req.cookies.tokenUser
        }).select("-password");

        if (user) {
            res.locals.user = user;
        }
    }
    next();
}