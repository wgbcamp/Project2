var db = require("../models")

module.exports = function(app) {

    app.post("/api/register", function(req, res) {
        console.log(req.body)
        // Bring in the reqs so that we can do some checks here (we could move this to another file later)
        const { username, password, password2 } = req.body;
        let errors = [];
        // Check that fields are filled
        if (!username || !password || !password2) {
            errors.push({ msg: 'please fill in all fields'})
        };
        // Check that password match
        if (password !== password2) {
            errors.push({ msg: 'Password must match!'})
        };
        // Check password length
        if (password.length < 6) {
            errors.push({ msg: 'Password must contain at least 6 characters'})
        };
        // If there are errors, send back the errors and username
        if (errors.length > 0) {
            res.render("register", {
                errors,
                username
            });
            // Otherwise log success and create a new row on the users table
        } else {
            console.log("success")
            db.Users.create({
                username,
                password 
            }).then(function() {
                res.render("login")
            })
        }; 
    });
  };
  