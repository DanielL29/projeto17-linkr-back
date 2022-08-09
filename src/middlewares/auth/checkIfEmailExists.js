import { getUserByEmail } from "./../../repositories/authRepository.js";

async function checkIfEmailExists(req, res, next) {
    const { email } = req.body;
    const { rowCount: users } = await getUserByEmail(email);
    const isUserNotValid = users === 1;
    if(isUserNotValid) {
        return res.sendStatus(409);
    }
    next();
}

export default checkIfEmailExists;