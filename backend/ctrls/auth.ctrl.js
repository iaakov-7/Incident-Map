import { createAuthService } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

const authService = createAuthService();
export async function handleRegister(
  req,
  /** @type {import("express").Response} */ res,
) {
  const { email, password } = req.body;
  const user = await authService.createUser(email, password);
  const { passwordHash, ...safeUser } = user;
  const token = generateToken(safeUser);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(201).json({ success: true, data: safeUser });
}
