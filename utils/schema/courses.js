const joi = require('@hapi/joi');

const type = ["SOLO","COACHING"]
const premium = ["NORMAL","PREMIUM"]
// Clases
const courseIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const courseUserIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const courseCoachIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const courseSchedule = joi.date().iso();//debe ser asi "1996-10-16 11:11:11"
const courseCoachName = joi.string().max(80);
const courseTypeClass = joi.string().valid(...type);
const coursePrice = joi.number().min(0).max(1000);
const coursePremium = joi.string().valid(...premium);
const courseDates = joi.array().items(joi.string().min(9).max(10))
const courseNumbers = joi.number().min(2).max(9);
// const userDate = joi.date().iso();


const createCourseSchema = joi.object({
  user_id: courseUserIdSchema.required(),
  schedule: courseSchedule.required(),
  coach: courseCoachName.required(),
  type: courseTypeClass.required(),
  price: coursePrice.required(),
  premium: coursePremium.required(),
  dates: courseDates.required(),
  classes:courseNumbers.required()
  // date: userDate,
})

const updateCourseSchema = {
  schedule: courseSchedule.required(),
  coach: courseCoachName.required()
};

module.exports = {
  courseIdSchema,
  courseCoachIdSchema,
  createCourseSchema,
  updateCourseSchema
};

// {
//   "user_id":"5df02e7faad68a3d1c58135d",
//   "schedule": "1996-10-16 11:11:11",
//   "coach": "murdoc",
//   "type": "COACHING",
//   "price": "500",
//   "premium": "false",
//   "date": "2020-01-01 01:01:01"
// }