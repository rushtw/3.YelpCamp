

const p = console.log;

let express = require("express");
app = express();
let bodyParser = require("body-parser");
//let request=require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

let campgrounds = [
    {
        name: "Camp 1",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Camp 2",
        image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"
    },
    {
        name: "Camp 3",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
    },
    {
        name: "Camp 4",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Camp 5",
        image: "https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"
    },
    {
        name: "Camp 6",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"
    }
];

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    // res.send("pots route");
    // get data from form to add campgrounds
    let name = req.body.name;
    let image =req.body.image;
    campgrounds.push({name: name, image: image});
    // redirect back to campground page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
})

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => p(`Server STARTED on ${PORT}`));
