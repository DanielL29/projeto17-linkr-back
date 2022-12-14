import { getUserByEmail } from "./../../repositories/authRepository.js";
import bcrypt from "bcrypt";

async function checkCredentials(req, res, next) {
    const { email, password } = req.body;
    try {
        const { rows: users } = await getUserByEmail(email);
        const isUserRegistered = users.length === 1;
        const isPasswordValid = isUserRegistered ? await bcrypt.compare(password, users[0].password) : false;
        if(isPasswordValid) {
            return next();
        }
        res.status(404).send("Usuário ou senha incorretos.");
    } catch {
        res.sendStatus(500);
    }
}

export default checkCredentials;