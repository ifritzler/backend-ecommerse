import express from "express";
import productsRouter from "./products.routes.js";
import fakeProductsRouter from "./fakeProducts.routes.js";

const api = express.Router();
api.use("/products", productsRouter);
api.use("/productos-test", fakeProductsRouter);

export default api;
