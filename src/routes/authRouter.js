import { Router } from "express";
import validateSchema from "./../middlewares/validations.js";
import checkIfEmailExists from "./../middlewares/auth/checkIfEmailExists.js";
import { insertUser } from "./../repositories/authRepository.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema("signup"), checkIfEmailExists, insertUser);

export default authRouter;