import { getUserByEmail } from "./../../repositories/authRepository.js";

async function checkIfEmailExists(req, res, next) {
    const { email } = req.body;
    const { rowCount: users } = await getUserByEmail(email);
    const isUserNotValid = users === 1;
    if(isUserNotValid) {
        return res.status(409).send("Esse email já está cadastrado.");
    }
    next();
}

export default checkIfEmailExists;