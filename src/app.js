import "dotenv/config";
import express from 'express';
import ejsConfig from "./config/ejs.js";
import { app, httpServer } from "./config/http.js";
import { SocketConfig } from "./config/socketio.js";
import messageSocket from "./controllers/chat.socket.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";
import clientRouter from "./routes/client.js";

const socketConfig = new SocketConfig();
socketConfig.use(messageSocket);
socketConfig.exec();

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

export default httpServer;
