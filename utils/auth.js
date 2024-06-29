
const withAuth = (req, res, next) => {
  // Redirect the anonymous users to a Log In page
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
