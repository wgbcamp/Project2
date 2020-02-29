// require dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const passport = require('passport')
const session = require('express-session')
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

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
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  

/*


------------------------------------------------------WARREN---

*/

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/assets/uploads/',
  filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage, 
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
      checkFileType(file, cb);
  }
}).single('myImage');

//Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null, true);
  }else{
      cb('Error: Images Only!');
  }
}

// Init app
// const app = express(); already done

//EJS
// app.set('view engine', 'ejs'); need to use handlebars

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
      if(err){
          res.render('index', {
             msg: err 
          });
      } else {
          if(req.file == undefined){
              res.render('index', {
                  msg: 'Error: No File Selected!'
              }); 
          }else {
              res.render('index', {
                  msg: 'File Uploaded!',
                  file: `uploads/${req.file.filename}`
              });
          }
      }
  });
});

const port = 3000;

app.listen(port, () => console.log('Server started on port ' + port));