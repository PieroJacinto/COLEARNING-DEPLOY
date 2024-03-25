// const User = require('../models/user.model')
const { User } = require('../database/models');
async function userLoggedMiddleware(req, res, next) {
  // res.locals.isLogged = false;

  const emailCookie = req.cookies.userEmail;
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  if (emailCookie && !req.session.userLogged) {
    const user = await User.findOne({
      where: {
        email: emailCookie,
        status: 1
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'address', 'profile_id'],
    }
    );
    if (user) {
      req.session.userLogged = user.get({ plain: true });
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
  }
  next();
}

module.exports = userLoggedMiddleware