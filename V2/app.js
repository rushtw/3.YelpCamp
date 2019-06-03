const p = console.log;

let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/yelp_camp",
    { useNewUrlParser: true }
);

let Campground = require("./models/campground");
let seedDB = require("./seeds");
//let Comment = require("./models/comment");


// mongoose.connect(
//   "mongodb://localhost:27017/yelp_camp",
//   { useNewUrlParser: true }
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});


// Index Route - show campgrounds
app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) p(err);
    else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE Route - add new campground to database
app.post("/campgrounds", (req, res) => {
  // res.send("pots route");
  // get data from form to add campgrounds
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;

  let newCampground = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      p(err);
    } else {
      // redirect back to campground page
      res.redirect("/campgrounds");
    }
  });
});

// NEW route - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

// SHOW /campgrounds:id
app.get("/campgrounds/:id", (req, res) => {
  // find campground with provided id
  //populate("comment") works differently
  p(req.params)
  //p(Campground.findById(req.params.id))
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      p("ERROR IS = "+err);
    } else {
      p("foundCampground = "+foundCampground);
      res.render("show", { campground: foundCampground });
    }
  });
});

/////////////////////////////////////////////////////////
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => p(`Server STARTED on ${PORT}`));
