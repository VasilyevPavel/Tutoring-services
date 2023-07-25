module.exports = function isAuth(req, res, next) {
  const login = req.session?.login;
  if (login) {
    next();
    return;
  }
  res.redirect('/login');
};
