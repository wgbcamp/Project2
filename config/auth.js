module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        else { res.render("notloggedin", { msg: "You must be logged in to do that"}) } 
    }
}