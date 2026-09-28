import jwt from "jsonwebtoken";

export function verifyToken(
  /** @type {import("express").Request} */ req,
  res,
  next,
) {
  const token = req.cookies.token;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    throw error;
  }
}
