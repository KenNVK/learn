const playerRouter = require("./players");

function route(app) {
  app.use("/players", playerRouter);
}
module.exports = route;
