import postSchema from './postSchema.js';
import { signupSchema } from './authSchema.js';

const schemas = {
    signin: '',
    signup: signupSchema,
    post: postSchema,
    hashtag: ''
}

export default schemas