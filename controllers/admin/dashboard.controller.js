module.exports.dashboard = (req, res) => {
  res.render('admin/pages/dashboard/index.pug', { title: 'Dashboard', message: 'Trang tong quan' });
}