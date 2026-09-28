import express from "express";
import "dotenv/config";
import { router as autoRouter } from "./routes/auth.routes.js";
import { router as incidentsRouter } from "./routes/incidents.routes.js";
import { errorHandler } from "./middlewares/errorHandler.midlleware.js";

const app = express();
app.use(express.json());
app.use("/auth", autoRouter);
app.use("/incidents", incidentsRouter);

app.use((req, res, next) => {
  console.log(`${(req.method, req.url)}`);
  next();
});
app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
