import { create } from "axios";

export const api = create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  withCredentials: true,
});
