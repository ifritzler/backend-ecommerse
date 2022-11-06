import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";
import ejsConfig from "./config/ejs.js";
import productService from "./services/products.service.js";

dotenv.config();

const app = express();

// Templates configure
ejsConfig(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(process.cwd + "/public"));

app.use("/api", apiRouter);

app.get("/api/health", (_req, res) => {
  res.status(200).send();
  res.render();
});

app.get("/", async (req, res, next) => {
  try {
    const products = await productService.all();
    res.render("index", { products });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

export default app;
