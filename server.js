// Setup Handlebars
var exphbs = require("express-handlebars");

// require dependencies
var express = require("express");

// Sets up the Express App
var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require db
var db = require("./models");

// Set port
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory 
app.use(express.static("./public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Sync sequelize models and start express app

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });

  });
  
