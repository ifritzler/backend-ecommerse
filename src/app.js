import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd + "/public"));

app.use("/api", apiRouter);

app.get("/api/health", (_req, res) => {
  res.status(200).send();
  res.render()
});

app.use(errorHandler);

export default app;
