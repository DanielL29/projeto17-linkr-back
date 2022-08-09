import urlMetadata from 'url-metadata'

async function urlMetadatas(req, res, next) {
    const { url } = req.body

    try {
        const metadata = await urlMetadata(url)

        res.locals.urlTitle = metadata.title
        res.locals.urlDescription = metadata.description

        if(!metadata.image.startsWith('https://')) {
            res.locals.urlImage = 'https://' + metadata.source + metadata.image
        } else {
            res.locals.urlImage = metadata.image
        }

        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export default urlMetadatas