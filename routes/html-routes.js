var db = require("../models")

module.exports = function (app) {

  // Create Account Page
  app.get("/register", function (req, res) {
    res.render("register")
  });

  // Login page
  app.get("/login", function (req, res) {
    res.render("login")
  })

  // Account page will render a single user's profile
  app.get("/account/:username", function (req, res) {
    db.Users.findOne({
      where: {
        username: req.params.username
      }
    }).then(user => {
      // Render the 'account' view with the single user passed in
      res.render("account", { user })
    })
  });

  // New Post Page
  app.get("/newPost", function (req, res) {
    res.render("newPost")
  });

  // Page to view a single post
  app.get("/posts/:id", function (req, res) {
    db.Posts.findOne({
      where: {
        id: req.params.id
      }
    }).then(post => {
      // Render the 'onePost' view with the single post passed in
      res.render("onePost", { post })
    })
  });

  // Posts page will render all posts  -----------!! We will have to change this to an inner join to get posts and captions
  app.get("/", function (req, res) {
    db.Posts.findAll().then(posts => {
      // Render the 'allPosts' view with posts passed in as an object (handlebars reads the object/keys)
      res.render("allPosts", { posts });
      // Handlebars keys (on the html page) have to be written as "dataValues.title" or "dataValues.author" 
      // but the actual object can just be "posts"
    });
  });

  // Index page will be a homepage with a login button
  app.get("/", function (req, res) {
    res.render("welcome")
  })

}