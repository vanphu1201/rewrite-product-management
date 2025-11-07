module.exports.otpPost = (req, res, next) => {
    if(!req.body.otp) {
        req.flash('danger', 'Vui lòng nhập mã OTP!');
        res.redirect(req.headers.referer);
        return;
    }
    next();
}

