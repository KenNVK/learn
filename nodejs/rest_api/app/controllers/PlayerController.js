const Player = require("../models/Player");

class PlayerController {
  // [GET] /players/all
  all(req, res, next) {
    Player.find({})
      .then(player => res.json(player))
      .catch(next);
  }

  //[GET] /players/:slug
  one(req, res, next) {
    Player.findOne({ slug: req.params.slug })
      .then(player => res.json(player))
      .catch(next);
  }

  // [GET] /players/create
  create(req, res, next) {
    req.body.name;
    req.body.description;
    req.body.nationality;
    const player = new Player(req.body);
    player
      .save()
      .then(player => res.json(player))
      .catch(next);
  }

  // [DELETE] /players/delete/:id
  delete(req, res, next) {
    Player.deleteOne({ id: req.params._id })
      .then(() => res.json({ message: "Deleted id:" + req.params.id }))
      .catch(next);
  }

  // [UPDATE] /players/update/:id
  update(req, res, next) {
    Player.updateOne({ id: req.params._id }, req.body)
      .then(() => res.json({ message: "Updated" }))
      .catch(next);
  }
}

module.exports = new PlayerController();
