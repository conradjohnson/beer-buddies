const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // this will check for the presence of 'logged_in' from our session and check 
  // to see if its value is TRUE.
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
