module.exports.forgotPasswordPost = (req, res, next) => {
    if(!req.body.email) {
        req.flash('danger', 'Vui lòng nhập email!');
        res.redirect(req.headers.referer);
        return;
    }
    next();
}

