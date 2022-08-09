import schemas from '../../schemas/schemas.js'

function validateSchema(schema) {
    return (req, res, next) => {
        const { error } = schemas[schema].validate(req.body, { abortEarly: false })

        if(error) {
            let details = ""

            error.details.forEach(detail => details += `${detail.context.key}: ${detail.message} \n`)

            return res.status(422).send(details)
        }

        next()
    }
}

export default validateSchema