var express       = require("express"),
    app           = express(),
    Comment       = require("./models/comment"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    Campground    = require("./models/campground"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user"),
    seedsDB       = require("./seeds");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//seedsDB();

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Once again rusty is the cutest",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000, function(){
  console.log("The YelpCamp server has started!");
});
