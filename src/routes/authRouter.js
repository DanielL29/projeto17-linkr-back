import { Router } from "express";
import validateSchema from "./../middlewares/validations/validateSchema.js";
import checkIfEmailExists from "./../middlewares/auth/checkIfEmailExists.js";
import { signup, searchUsers, signin } from "./../controllers/authController.js";
import checkCredentials from "../middlewares/auth/checkCredentials.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema("signup"), checkIfEmailExists, signup);
authRouter.post("/signin", validateSchema("signin"), checkCredentials, signin);
authRouter.get("/search", searchUsers)

export default authRouter;