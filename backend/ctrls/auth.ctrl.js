import { userRepo } from "../repository/user.repo.js";
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

export async function handleLogin(
  req,
  /** @type {import("express").Response} */ res,
) {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const { passwordHash, ...safeUser } = user;
  const token = generateToken(safeUser);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ success: true, data: safeUser });
}

export async function handleGetUser(req, res) {
  const { email } = req.user;
  const user = await userRepo.findUserByEmail(email);
  const { passwordHash, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
}

export function handleLogout(
  req,
  /**@type {import("express").Response} */ res,
) {
  res.clearCookie("token");
  res.json({ success: true });
}
