const joi = require('@hapi/joi');
const {createCourseSchema} = require('../../utils/schema/courses')

const emun = ["LAN","LAS","NA","BR"]

// Usuario
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(80);
const userEmailSchema = joi.string().max(80);
const userPasswordSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const userBirthDaySchema = joi.number().min(1960).max(2007);
const userContentRatingSchema = joi.string().max(80);
const userDiscordchema = joi.string().min(2).max(40);
const userServer = joi.string().valid(...emun); 
const userVerified = joi.boolean(); // testear


const createUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  birthday: userBirthDaySchema.required(),
  isAdmin: joi.boolean(),
  server:userServer.required(),
  contentRating: userContentRatingSchema,
  discord: userDiscordchema,
  classes: createCourseSchema,
  verified: userVerified
};


const updateUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  birthday: userBirthDaySchema,
  contentRating: userContentRatingSchema,
  discord: userDiscordchema,
  classes: joi.array().items(createCourseSchema) // Me costo un webo
 };

const createProviderUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  apiKeyToken: joi.string().required()
};

module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema,
  updateUserSchema
};

// {
// 	"name": "Jose",
// 	"email": "Jose@gmail.com",
// 	"password": "jojojo",
// 	"birthday": "1996",
// 	"elo": "Diamante",
// 	"lp": 15,
// 	"contentRating": "4",
// 	"order": 4,
// 	"discord": "jejeje",
// }