import bcrypt from "bcrypt";
import { userRepo } from "../repository/user.repo.js";

export function createAuthService(repo = userRepo) {
  async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      email: email,
      passwordHash: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };
    const result = await repo.insertUser(newUser);
    return result;
  }
  return { createUser };
}
