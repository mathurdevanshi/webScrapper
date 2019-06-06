//These are requesting the packages we are using
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var express = require("express");
var app = express();

//connecting to mongoose and monog
var mongojs = require("mongojs");
var db = mongojs("DevanshiDataBase", ["nhlHomework"]);
mongoose.connect(
  "mongodb://heroku_43c00hd8:qqv2umpiq3rau9or2dsl31icl1@ds131737.mlab.com:31737/heroku_43c00hd8",
  {
    useNewUrlParser: true
  }
);

//connecting to the heroku data base
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/DevanshiDataBase";
mongoose.connect(MONGODB_URI);

//setting up the logger (which helps with the html requests)
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//creating routes that we are going to need for this project
app.use(express.static(process.cwd() + "/public"));

//getting handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose");
});

//connecting to other files
var routes = require("./controller/controller.js");
app.use("/", routes);

//linking to local port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});
