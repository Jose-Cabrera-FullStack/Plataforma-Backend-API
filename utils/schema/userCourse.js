const joi = require('@hapi/joi');

const { courseIdSchema } = require('./courses');
const { userIdSchema } = require('./users');

const userCourseIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserCourseSchema = {
  userId: userIdSchema,
  courseId: courseIdSchema
};

module.exports = {
  userCourseIdSchema,
  createUserCourseSchema
};
