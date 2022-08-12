import postSchema from './postSchema.js';
import { signupSchema, signinSchema } from './authSchemas.js';

const schemas = {
    signin: signinSchema,
    signup: signupSchema,
    post: postSchema,
    hashtag: ''
}

export default schemas