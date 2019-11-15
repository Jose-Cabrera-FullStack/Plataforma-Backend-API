const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(80);
const userEmailSchema = joi.string().max(80);
const userPasswordSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
// const userRepeatPasswordSchema = joi.ref('userPasswordSchema'); Usar una variable que almacene el password para luego hacer la comparación
const userBirthDaySchema = joi.number().min(1960).max(2007);
const userEloSchema = joi.string().max(20);
const userLpSchema = joi.number().min(10).max(26);
const userContentRatingSchema = joi.string().max(5);
const userOrderSchema = joi.number();
const userDiscordchema = joi.string().min(2).max(40);

const createUserSchema = joi.object({
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  isAdmin: joi.boolean(),
  // repeat_password: userRepeatPasswordSchema.required(),
  birthday: userBirthDaySchema,
  elo: userEloSchema,
  lp: userLpSchema,
  contentRating: userContentRatingSchema,
  order: userOrderSchema,
  discord: userDiscordchema
});

// const createUserSchema = {
//   ...userSchema,
//    isAdmin: joi.boolean(),
// }

const updateUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  // repeat_password: userRepeatPasswordSchema.required(),
  birthday: userBirthDaySchema,
  elo: userEloSchema,
  lp: userLpSchema,
  contentRating: userContentRatingSchema,
  order: userOrderSchema,
  discord: userDiscordchema
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