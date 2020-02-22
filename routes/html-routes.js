var db = require("../models")

module.exports = function(app) {


    app.get("/", function(req, res) {
        // Set posts variable = data in the table
        // Maybe reset certain obj keys, as in 'captions.all where votes = highest' and set that as TopPost
        db.Posts.findAll({}).then(function(data) {
            var dataObject = data
            console.log(dataObject);
            res.render("index", dataObject);
          });
        })
    }