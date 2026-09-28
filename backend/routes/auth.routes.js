import express from "express";
import { validateBody } from "../middlewares/validations.midlleware.js";
import { authSchema } from "../schemas/auth.schema.js";
import {
  handleGetUser,
  handleLogin,
  handleLogout,
  handleRegister,
} from "../ctrls/auth.ctrl.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

export const router = express.Router();

router.post("/register", validateBody(authSchema), handleRegister);

router.post("/login", validateBody(authSchema), handleLogin);

router.post("/logout", verifyToken, handleLogout);

router.get("/me", verifyToken, handleGetUser);
