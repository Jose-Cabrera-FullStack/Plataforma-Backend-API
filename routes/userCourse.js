const express = require('express');
const passport = require('passport');

const UserCourseService = require('../services/userCourse');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationsHandler');

const { courseIdSchema } = require('../utils/schema/courses');
const { userIdSchema } = require('../utils/schema/users');
const { createUserCourseSchema } = require('../utils/schema/userCourse');

// JWT strategy
require('../utils/auth/strategies/jwt');

function userCoursesApi(app) {
  const router = express.Router();
  app.use('/api/user-courses', router);

  const userCoursesService = new UserCourseService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-course']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function(req, res, next) {
      const { userId } = req.query;

      try {
        const userCourses = await userCoursesService.getUserCourse({ userId });

        res.status(200).json({
          data: userCourses,
          message: 'user course listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-course']),
    validationHandler(createUserCourseSchema),
    async function(req, res, next) {
      const { body: userCourse } = req;

      try {
        const createdUserCourseId = await userCoursesService.createUserCourse({
          userCourse
        });

        res.status(201).json({
          data: createdUserCourseId,
          message: 'user course created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userCourseId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-course']),
    validationHandler({ userCourseId: courseIdSchema }, 'params'),
    async function(req, res, next) {
      const { userCourseId } = req.params;

      try {
        const deletedUserCourseId = await userCoursesService.deleteUserCourse({
          userCourseId
        });

        res.status(200).json({
          data: deletedUserCourseId,
          message: 'user course deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userCoursesApi;
