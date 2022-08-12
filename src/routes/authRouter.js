import { Router } from "express";
import validateSchema from "./../middlewares/validations/validateSchema.js";
import checkIfEmailExists from "./../middlewares/auth/checkIfEmailExists.js";
import { signup, searchUsers, signin, getUser } from "./../controllers/authController.js";
import checkCredentials from "../middlewares/auth/checkCredentials.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema("signup"), checkIfEmailExists, signup);
authRouter.post("/signin", validateSchema("signin"), checkCredentials, signin);
authRouter.get("/search", searchUsers)
authRouter.get("/users/:userId", getUser)

export default authRouter;