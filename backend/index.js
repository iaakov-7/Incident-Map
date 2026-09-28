import express from "express";
import "dotenv/config";
import { router as autoRouter } from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use("/auto", autoRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
