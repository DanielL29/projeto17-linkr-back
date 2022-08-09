import postSchema from './postSchema.js';
import { signupSchema } from './authSchemas.js';

const schemas = {
    signin: '',
    signup: signupSchema,
    post: postSchema,
    hashtag: ''
}

export default schemas