module.exports.resetPost = (req, res, next) => {
    if(!req.body.password) {
        req.flash('danger', 'Vui lòng nhập mật khẩu!');
        res.redirect(req.headers.referer);
        return;
    }
    if(!req.body.confirmPassword) {
        req.flash('danger', 'Vui lòng xác nhận mật khẩu!');
        res.redirect(req.headers.referer);
        return;
    }
    next();
}
