//These are requesting the packages we are using
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var express = require("express");
var app = express();

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

//connecting to MongoDB
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose");
});

//linking to local port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on localhost:" + port);
});
