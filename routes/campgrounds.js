var express = require("express");
var router = express.Router({mergeParams: true});
var Campground= require("../models/campground");
var comment = require("../models/comment");

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
      if(err) {
        console.log("Error");
      }
      else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
    });
});
  
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
      if(err) {
        console.log(err);
      }
      else {
        res.redirect("/campgrounds")
      }
    });
});
  
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});
  
//Shows more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err) {
        console.log(err);
      }
      else {
        res.render("campgrounds/show", {campground: foundCampground});
      }
    });
});
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
}

module.exports = router;