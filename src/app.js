import dotenv from "dotenv/config";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";
import http from "http";
import morgan from 'morgan'

const app = express();
const server = http.createServer(app);

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(process.cwd + "/public"));

// Client views and API routes
app.use("/api", apiRouter);

// API health check
app.get("/api/health", (_req, res) => {
  res.status(200).send();
  res.render();
});

app.use(errorHandler);

export default server;
