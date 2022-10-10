const express = require("express");

const app = express();
const port = 3000;
const db = require("./config/db");
const route = require("./routes");

db.connect();

app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
