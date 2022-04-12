const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // We call next() if the user is authenticated
      next();
    }
  };

  const withAdmin = (req, res, next) => {
    if(!req.session.loggedIn || !req.session.isAdmin) {
      res.redirect('/');
    } else {
      next();
    }
  }
  
  module.exports = { withAuth, withAdmin };