import express from "express";
import productsRouter from "./products.routes.js";

const api = express.Router();
api.use("/products", productsRouter);

export default api;
