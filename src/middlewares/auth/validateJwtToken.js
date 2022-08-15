import jwt from "jsonwebtoken";

function validateJwtToken(req, res, next) {
    const { authorization }= req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        const { id: user } = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = user;
        next();
    } catch {
        res.sendStatus(401);
    }
}

export default validateJwtToken;