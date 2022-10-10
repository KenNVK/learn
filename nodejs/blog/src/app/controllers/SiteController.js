const Course = require("../models/Course");
const { multipleMongooseToObjiect } = require("../../util/mongoose");
class SiteController {
  // [GET] /
  home(req, res, next) {
    Course.find({})
      .then(courses =>
        res.render("home", {
          courses: multipleMongooseToObjiect(courses),
        })
      )
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();