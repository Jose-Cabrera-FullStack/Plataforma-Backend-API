const joi = require('@hapi/joi');


const emun = ["SOLO","COACHING"]
// Clases
const courseIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const courseCoachIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const courseSchedule = joi.date().iso();//debe ser asi "1996-10-16 11:11:11"
const courseCoachName = joi.string().max(80);
const courseTypeClass = joi.string().valid(...emun);
const coursePrice = joi.number().min(0).max(1000);
const coursePremium = joi.boolean();
const userDate = joi.date().iso();


const createCourseSchema = joi.object({
  schedule: courseSchedule.required(),
  coach: courseCoachName.required(),
  type: courseTypeClass.required(),
  price: coursePrice.required(),
  premium: coursePremium.required(),
  date: userDate.required()
})

// const createUserSchema = {
//   ...userSchema,
//    isAdmin: joi.boolean(),
// }

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
// 	"schedule": "17.01.2020",
// 	"coach": "murdoc",
// 	"type": "Profesional Player",
// 	"enable": "true",
// 	"price": "500",
// 	"premium": "false",
// }