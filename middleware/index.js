var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/homepage");
}

module.exports = middlewareObj;
