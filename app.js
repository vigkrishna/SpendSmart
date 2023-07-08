var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
const User = require("./model/User");
const path = require("path");
var app = express();
  
mongoose.connect("mongodb://127.0.0.1:27017");
app.use(express.static("public")); 
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
  
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  app.use(express.static("public"));
//=====================
// ROUTES
//=====================
  
// Showing home page
app.get("/", function (req, res) {
    res.render("home");
});
  
// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
  
// Showing register form
app.get("/register", function (req, res) {
    res.render("register");
});
  
// Handling user signup
app.post("/register", async (req, res) => {
  if((req.body.username) &&(req.body.password)){
    const user = await User.create({
      username: req.body.username,
      
      password: req.body.password,
      
    });
    
    // return res.status(200).json(user);
    return res.render("login");}
    else{
      return res.sendFile(__dirname +"/errorpage.html")
    }
  });
  
//Showing login form
app.get("/login", function (req, res) {
    res.render("login");
});
  
//Handling user login
app.post("/login", async function(req, res){

  if((req.body.username) &&(req.body.password)){

    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
          const result = req.body.password === user.password;

          if (result) {
            res.render("secret");
          } else {
            res.status(400).sendFile( __dirname + "/errorpage.html" );
          }
        } else {
          res.status(400).sendFile( __dirname + "/errorpage.html" );
        }
      } catch (error) {
        res.status(400).sendFile( __dirname + "/errorpage.html" );
      }
    }
    else{
      return res.sendFile(__dirname + "/errorpage.html");
    }
}
);
  

// app.post("/expenses", function(req,res){
//   res.send("<h1>hello</h1>")
// })







//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});
  
  
  
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
  
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server Has Started!");
});