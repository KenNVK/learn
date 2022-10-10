const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/football_players", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connect to database successfully !");
  } catch (error) {
    console.log("Connect to database failure !");
  }
}

module.exports = { connect };
