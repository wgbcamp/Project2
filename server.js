// require dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var multer = require("multer");
// var upload = require({dest: "./public/uploads"})


// Sets up the Express App
var app = express();

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require db
var db = require("./models");

// Set port
var PORT = process.env.PORT || 8080;

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory 
app.use(express.static("public"));


// Routes
// require("./routes/api-routes.js")(app);
require("./routes/html-routes")(app);

// Sync sequelize models and start express app
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  
