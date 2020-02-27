// require dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require('passport')
const session = require('express-session')

// Sets up the Express App
const app = express();

// Require db
const db = require("./models");

// Serve static content for the app from the "public" directory 
app.use(express.static("public"));

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Sesssion
app.use(session({
  secret: 'anything',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set port
const PORT = process.env.PORT || 8080;

// Use Passport
require('./config/passport')(passport);

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Sync sequelize models and start express app
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  
