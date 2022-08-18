import postSchema from './postSchema.js';
import { signupSchema, signinSchema } from './authSchemas.js';
import commentSchema from './commentSchema.js';

const schemas = {
    signin: signinSchema,
    signup: signupSchema,
    post: postSchema,
    comment: commentSchema
}

export default schemas