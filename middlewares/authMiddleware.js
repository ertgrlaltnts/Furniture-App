const User = require("../models/User");

module.exports = (req, res, next) => {
  const user =  User.findById(req.session.userID , (err, user) => {
    if (err || !user) {
      res.redirect("/login");
    }
    next();
  });
};
