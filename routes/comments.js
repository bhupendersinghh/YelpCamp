var express = require("express");
var router = express.Router({mergeParams: true});
var Campground= require("../models/campground");
var Comment = require("../models/comment");
//============================
//COMMENTS ROUTES
//============================
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if(err) {
        console.log("Error");
      }
      else {
        res.render("comments/new", {campground: foundCampground});
      }
    });
}); 
  
router.post("/", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if(err) {
        console.log("Error!");
        res.redirect("/campgrounds");
      }
      else {
        Comment.create(req.body.comment, function(err, comment) {
          if(err) {
            console.log(err);
          }
          else {
            foundCampground.comments.push(comment);
            foundCampground.save();
            res.redirect("/campgrounds/" + foundCampground._id);
          }
        });
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