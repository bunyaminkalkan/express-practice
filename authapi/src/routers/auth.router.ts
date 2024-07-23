import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register, login);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;