import Joi from "joi";

const signupSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    pictureUrl: Joi.string().trim().uri().required(),
});

const signinSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

export { signupSchema, signinSchema };