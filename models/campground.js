let mongoose = require("mongoose");

//SCHEMA
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

//let Campground = mongoose.model("Campgrounds", campgroundSchema);

module.exports = mongoose.model("Campgrounds", campgroundSchema);
