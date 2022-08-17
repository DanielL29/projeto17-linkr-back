import joi from 'joi'

const commentSchema = joi.object({
    description: joi.string().required()
})

export default commentSchema