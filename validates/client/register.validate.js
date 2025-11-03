module.exports.registerPost = (req, res, next) => {
    if(!req.body.fullName) {
        req.flash('danger', 'Vui lòng nhập họ tên!');
        res.redirect(req.headers.referer);
        return;
    }
    if(!req.body.email) {
        req.flash('danger', 'Vui lòng nhập email!');
        res.redirect(req.headers.referer);
        return;
    }
    else if(!req.body.password) {
        req.flash('danger', 'Vui lòng nhập mật khẩu!');
        res.redirect(req.headers.referer);
        return;
    }
    else {
        next();
    }
}