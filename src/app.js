import dotenv from "dotenv";
import express from "express";
import ejsConfig from "./config/ejs.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";
import http from "http";
import { CustomSocket } from "./config/socketio.js";
import clientRouter from "./routes/client.js";

dotenv.config();

// Express and server socket config
const app = express();
const server = http.createServer(app);
export const socketInstance = new CustomSocket(server);

// Templates configure
ejsConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(process.cwd + "/public"));

// Client views and API routes
app.use(clientRouter);
app.use("/api", apiRouter);

// API health check
app.get("/api/health", (_req, res) => {
  res.status(200).send();
  res.render();
});

app.use(errorHandler);

export default server;
