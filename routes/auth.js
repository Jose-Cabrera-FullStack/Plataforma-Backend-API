const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const CoursesService = require('../services/courses');
// const confirmationEmail = require('../services/confirmation');
const validationHandler = require('../utils/middleware/validationHandler');

const {
  createUserSchema,
  createProviderUserSchema
} = require('../utils/schema/users');

const {
  createCourseSchema
} = require('../utils/schema/courses');

const { config } = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();
  const coursesService = new CoursesService();

  router.post('/sign-in', async function(req, res, next) {

    const { apiKeyToken } = req.body;

    // console.log('hola',req, 'chao')
    
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }
    
    passport.authenticate('basic', function(error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        // console.log('aca',user)
        
        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email, server } = user;

          const payload = {
            sub: id,
            name,
            email,
            server,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '30m'
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema), async function(
    req,
    res,
    next
  ) {
    const { body: user } = req;
    
    try {
      const createdUserId = await usersService.createUser({ user });

      res.status(201).json({
        data: createdUserId,
        message: 'user created'
      });

    } catch (error) {
      next(error);
    }
  });
  router.post('/courses', validationHandler(createCourseSchema), async function(
    req,
    res,
    next
  ) {
    const { body: course } = req;

    try {
      const createdCourseId = await coursesService.createCourse({ course });

      res.status(201).json({
        data: createdCourseId,
        message: 'course created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/sign-provider',
    validationHandler(createProviderUserSchema),
    async function(req, res, next) {
      const { body } = req;

      const { apiKeyToken, ...user } = body;

      if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'));
      }

      try {
        const queriedUser = await usersService.getOrCreateUser({ user });
        const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

        if (!apiKey) {
          next(boom.unauthorized());
        }

        const { _id: id, name, email } = queriedUser;

        const payload = {
          sub: id,
          name,
          email,
          scopes: apiKey.scopes
        };

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '30m'
        });

        return res.status(200).json({ token, user: { id, name, email } });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = authApi;
