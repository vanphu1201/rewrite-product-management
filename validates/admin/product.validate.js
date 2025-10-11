module.exports.createPOST = (req, res, next) => {
    if(!req.body.title) {
        req.flash('danger', 'Vui lòng thêm tiêu đề');
        res.redirect(req.headers.referer);
        return;
    } else {
        next();
    }
}