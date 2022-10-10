const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  nationality: { type: String },
  slug: { type: String, slug: "name", unique: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
