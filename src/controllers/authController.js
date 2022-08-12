import {
  insertUser,
  searchingUsers,
} from "./../repositories/authRepository.js";

async function signup(req, res) {
  const user = req.body;
  try {
    await insertUser(user);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

async function searchUsers(req, res) {
  //inserir token validation - Rota precisa de credencial
  const { username } = req.query;

  try {
    const { rows: users } = await searchingUsers(username.toLowerCase());
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export { signup, searchUsers };
