import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import { router as autoRouter } from "./routes/auth.routes.js";
import { router as incidentsRouter } from "./routes/incidents.routes.js";
import { errorHandler } from "./middlewares/errorHandler.midlleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`User: ${socket.id} disconnected`);
  });
});
app.set("io", io);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", autoRouter);
app.use("/incidents", incidentsRouter);

app.use((req, res, next) => {
  console.log(`cannot find ${(req.method, req.url)}`);
  next();
});
app.use(errorHandler);
server.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
