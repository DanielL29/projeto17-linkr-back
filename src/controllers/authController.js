import { insertUser } from "./../repositories/authRepository.js";

async function signup(req, res) {
    const user = req.body;
    try {
        await insertUser(user);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }   
}

export { signup };