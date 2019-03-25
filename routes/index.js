var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");

//ROUTES
router.get("/", function(req, res){
    res.render("landing");
});


//AUTHORIZATION ROUTES
  
//Show registration form
router.get("/register", function(req, res) {
    res.render("register");
});
  
//Handle Sign Up Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
      if(err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/campgrounds");
      });
    });
});
  
//Show login form
router.get("/login", function(req, res) {
    res.render("login");
});
  
//Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res) {
    
});
  
//Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});
  
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
}

module.exports = router;