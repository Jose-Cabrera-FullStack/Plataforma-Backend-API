const express = require('express');
const passport = require('passport');
const CoursesService = require('../services/courses');

const {
  courseIdSchema,
  createCourseSchema,
  updateCourseSchema
} = require('../utils/schema/courses');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationsHandler');

const cacheResponse = require('../utils/cacheReponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

// JWT strategy
require('../utils/auth/strategies/jwt');

function coursesApi(app) {
  const router = express.Router();
  app.use('/api/courses', router);

  const coursesService = new CoursesService();

  router.get('/',
    passport.authenticate('jwt', {
      session: false
    }),
    scopesValidationHandler(['read:courses']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const {
        tags
      } = req.query;

      try {
        const courses = await coursesService.getCourses({
          tags
        });

        res.status(200).json({
          data: courses,
          message: 'courses listed'
        });
      } catch (err) {
        next(err);
      }
    });

  router.get(
    '/:courseId',
    passport.authenticate('jwt', {
      session: false
    }),
    scopesValidationHandler(['read:courses']),
    validationHandler({
      courseId: courseIdSchema
    }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const {
        courseId
      } = req.params;

      try {
        const course = await coursesService.getCourse({
          courseId
        });

        res.status(200).json({
          data: course,
          message: 'course retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/',
    passport.authenticate('jwt', {
      session: false
    }),
    scopesValidationHandler(['create:courses']),
    validationHandler(createCourseSchema), async function (
      req,
      res,
      next
    ) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const {
        body: course
      } = req;
      try {
        const createdCourseId = await coursesService.createCourse({
          course
        });

        res.status(201).json({
          data: createdCourseId,
          message: 'course created'
        });
      } catch (err) {
        next(err);
      }
    });

  router.put(
    '/:courseId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:courses']),
    validationHandler({courseId: courseIdSchema}, 'params'),
    validationHandler(updateCourseSchema),
    async function (req, res, next) {
      const {courseId} = req.params;
      const {body: course} = req;

      try {
        const updatedCourseId = await coursesService.updateCourse({
          courseId,
          course
        });

        res.status(200).json({
          data: updatedCourseId,
          message: 'course updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:courseId',
    validationHandler({courseId: courseIdSchema}, 'params'),
    async function (req, res, next) {
      const {courseId} = req.params;

      try {
        const deletedCourseId = await coursesService.deleteMovie({courseId});

        res.status(200).json({
          data: deletedCourseId,
          message: 'course deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = coursesApi;