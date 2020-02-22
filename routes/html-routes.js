module.exports = function(app) {


    app.get("/", function(req, res) {
        // Set posts variable = data in the table
        // Maybe reset certain obj keys, as in 'captions.all where votes = highest' and set that as TopPost
        posts.all(function(data) {
            var FrontPagePosts = {
              posts: data
            };
            res.render("index", FrontPagePosts);
          });
      res.render(path.join(__dirname, "../public/blog.html"));
    });
  
  
  };
  