import schemas from '../../schemas/schemas.js'

function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false })

        if(error) {
            return res.status(422).send(error)
        }

        next()
    }
}

export default validateSchema