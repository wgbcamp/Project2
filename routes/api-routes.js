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
  

//   Still need:

// db.Users.update password ---- so users can update their passwords

// Post Routes
// db.Posts.create post  ---- so users can create posts

// db.Posts.update title  ---- so users can update titles of posts

// Caption Routes
// db.Captions.create caption  ---- so users can create new captions

// db.Captions.update noOfVotes  ---- to update votes when a user votes on a caption

// Votes Routes
// db.Votes.create vote  ---- will create a new vote when a user clicks the button

// db.Votes.update (just update. it has foreign keys that will change without any extra code from us) ---- if a user votes on a different caption

// Delete Routes
// db.Users.destroy user 

// db.Posts.destroy post

// db.Captions.destroy caption