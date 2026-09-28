import bcrypt from "bcrypt";
import { userRepo } from "../repository/user.repo.js";

export function createAuthService(repo = userRepo) {
  async function createUser(email, password) {
    const isEmail = await repo.findUserByEmail(email);
    if (isEmail) {
      const error = new Error(`Email: ${email} is already exists`);
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      email: email,
      passwordHash: hashedPassword,
      role: "user",
      createdAt: new Date().toLocaleString(),
    };
    const result = await repo.insertUser(newUser);
    return result;
  }

  async function login(email, password) {
    const user = await repo.findUserByEmail(email);
    if (!user) {
      const error = new Error(`User with email ${email} not found`);
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.passwordHash);
    if (!isEqual) {
      const error = new Error(`Invalid password`);
      error.statusCode = 401;
      throw error;
    }
    return user;
  }
  return { createUser, login };
}
