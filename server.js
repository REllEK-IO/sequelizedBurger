var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
const PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes
var routes = require("./controllers/burger_controller");

app.use("/", routes);

console.log("Listening to PORT: " + PORT);
app.listen(PORT);
