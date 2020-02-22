module.exports = function(app) {


  app.get("/", function(req, res) {
    // Set posts variable = data in the table
    // Maybe reset certain obj keys, as in 'captions.all where votes = highest' and set that as TopPost
    Posts.findAll({}).then(function(data) {
      
        res.render("index", data);
      });
});

};