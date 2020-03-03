var db = require("../models")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const upload = require('../server')
const { ensureAuthenticated } = require('../config/auth')


//saving image path for uploading caption value

module.exports = function (app) {

    // This will add the currently logged in user's username to the account/{username} URL and redirect them to it
    // The "Account" link in the navbar uses this route
    app.get("/api/acctredirect", function (req, res) {
        if (req.user) {
        res.redirect("/account/" + req.user.username)
        } else res.redirect("/login")
    })


    // CREATE User Route
    app.post("/api/register", function (req, res) {
        console.log(req.body)
        // Bring in the reqs so that we can do some checks here (we could move this to another file later)
        const { username, password, password2 } = req.body;
        let errors = [];
        // Check that fields are filled
        if (!username || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' })
        };
        // Check that password match
        if (password !== password2) {
            errors.push({ msg: 'Passwords must match!' })
        };
        // Check password length
        if (password.length < 6) {
            errors.push({ msg: 'Password must contain at least 6 characters' })
        };
        // If there are errors, send back the errors and username
        // This is useless for now, but we can add a partials folder with an 'errors' file inside and call that on the register page
        // We can pass the object from this res.render to show those error messages above on the page when a user makes an error
        if (errors.length > 0) {
            res.render("error", {
                errors
            });
            // Otherwise log success and create a new row on the users table
        } else {
            // Check if the username exists
            db.Users.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (user) {
                    // If the username exists, let the user know
                    // Just like above, this won't work without a partials folder and errors file
                    errors.push({ msg: 'This username already exists' });
                    res.render("error", {
                        errors
                    })
                }
                else {
                    // Password encryption
                    // This generates an encrytion 'salt' whatever that means
                    bcrypt.genSalt(10, function (err, salt) {
                        // This uses that 'salt' and creates a hashed password
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err) throw err;
                            // Post to the Users table and use the hash as the password
                            db.Users.create({
                                username,
                                password: hash
                            }).then(function () {
                                // Send the user to the login page
                                res.redirect("/login")
                            })
                        })
                    })
                }
            })
        }
    });
    
    // Login authentication
    app.post("/api/login", function (req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next)
    });


    // POST request to send images to client webpage
    app.post('/uploadimage', ensureAuthenticated, (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                res.render('newPost', {
                    msg: err
                });
            } else {
                if (req.file == undefined) {
                    res.render('newPost', {
                        msg: 'Error: No File Selected!'
                    });
                } else {
                    res.render('newPost', {
                        msg: 'File Uploaded!',
                        file: `/assets/images/${req.file.filename}`
                    });
                }


            }
        });
    });

    // POST Posts route
    app.post('/api/newPost', ensureAuthenticated, (req, res) => {
        db.Posts.create({
            title: req.body.title,
            image: req.body.image,
            totalVotes: 0,
            author: req.user.username,
            UserId: req.user.id
        })
            .then(function () {
                // Send the user back to main page
                res.redirect("/")
            })
    });

    // POST Captions route
    app.post('/api/newCaption/:id', ensureAuthenticated, (req, res) => {
        db.Captions.create({
            text: req.body.text,
            noOfVotes: 0,
            author: req.user.username,
            PostId: req.params.id,
            UserId: req.user.id
        })
        .then(function () {
            res.redirect("/")
        })
    })


      // UPDATE Passwords Route
      app.put("/api/users", ensureAuthenticated, function (req, res) {
        // Password encryption
        // This generates an encrytion 'salt' whatever that means
        bcrypt.genSalt(10, function (err, salt) {
            // This uses that 'salt' and creates a hashed password
            bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                if (err) throw err;
                // Post to the Users table and use the hash as the password
                db.Users.update({
                    password: hash
                }, {
                    where: {
                        username: req.user.username
                    }
                },
                ).then(function () {
                    // Go back to account page
                    console.log("SUCCESS")

                })
            })
        })
        res.redirect(204, "/")
    })


    // DELETE Captions route
    app.delete('/api/captions/:id', ensureAuthenticated, function (req, res) {
        db.Captions.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function () {
            
            res.redirect(303, "/")
        })
    })

    // DELETE Posts route
    app.delete('/api/posts/:id', ensureAuthenticated, function (req, res) {
        db.Posts.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function () {
            
            res.redirect(303, "/")
        })
    })

    // DELETE Users route
    app.delete('/api/users/:id', ensureAuthenticated, function (req, res) {
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function () {
            
            res.redirect(303, "/")
        })
    })

}

// Future: 

// db.Captions.update noOfVotes  ---- to update votes when a user votes on a caption


// Create/Update Votes Routes
// db.Votes.create vote  ---- will create a new vote when a user clicks the button

// db.Votes.update (just update. it has foreign keys that will change without any extra code from us) ---- if a user votes on a different caption
