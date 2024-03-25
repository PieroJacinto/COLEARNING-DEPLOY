function adminMiddleware(req, res, next) {
    if(req.session.userLogged.profile_id !== 1){
        return res.redirect("/products");
    }
    
  
    next();
  }
  
  module.exports = adminMiddleware;