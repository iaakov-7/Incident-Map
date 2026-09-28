import express from "express";
import { validateBody } from "../middlewares/validations.middleware.js";
import { authSchema } from "../schemas/auth.schema.js";
import { handleRegister } from "../ctrls/auth.ctrl.js";

export const router = express.Router();

router.post("/register", validateBody(authSchema), handleRegister);
