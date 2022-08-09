import { Router } from "express";
import validateSchema from "./../middlewares/validations/validateSchema.js";
import checkIfEmailExists from "./../middlewares/auth/checkIfEmailExists.js";
import { signup } from "./../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema("signup"), checkIfEmailExists, signup);

export default authRouter;