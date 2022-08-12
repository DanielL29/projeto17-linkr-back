import jwt from "jsonwebtoken";

function validateJwtToken(req, res, next) {
    const { authorization }= req.headers;
    const token = authorization?.replace("Bearer ", "");
    const user = jwt.decode(token);
    res.locals.user = user;
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch {
        res.sendStatus(401);
    }
}

export default validateJwtToken;