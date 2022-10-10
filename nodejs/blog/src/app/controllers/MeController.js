const Course = require('../models/Course');
const { multipleMongooseToObjiect } = require('../../util/mongoose');
const { Promise } = require('mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sortable(req),
      Course.countDocumentsDeleted()]
    )

      .then(([courses, deleteCount]) =>
        res.render('me/stored-courses', {
          deleteCount,
          courses: multipleMongooseToObjiect(courses)
        }),
      )
      .catch(next)
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses => res.render('me/trash-courses', {
        courses: multipleMongooseToObjiect(courses)
      }))
      .catch(next)
  }
}

module.exports = new MeController; 