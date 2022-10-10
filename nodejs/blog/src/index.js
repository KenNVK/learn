const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middleware/sortMiddleware");
const route = require("./routes");
const db = require("./config/db");

// Connect to db
db.connect();

const app = express();
const port = 3300;
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// // HTTP logger
// app.use(morgan('combined'));

// Custrom middleware
app.use(sortMiddleware);

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
