import {
  getUserByEmail,
  insertUser,
  searchingUsers,
} from "./../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req, res) {
  const user = req.body;
  const saltRounds = 10;
  user.password = bcrypt.hash(user.password, saltRounds);
  try {
    await insertUser(user);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

async function signin(req, res) {
  const { email } = req.body;
  try {
    const { rows: users } = await getUserByEmail(email);
    const data = {
      id: users[0].id,
    }
    const token = jwt.sign(data, process.env.SECRET_KEY);
    res.status(200).send(token);
  } catch {
    res.sendStatus(500);
  }
}

async function searchUsers(req, res) {
  //inserir token validation - Rota precisa de credencial
  const { username } = req.query;

  try {
    const { rows: users } = await searchingUsers(username.toLowerCase());
    console.log(users);
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export { signup, signin, searchUsers };
