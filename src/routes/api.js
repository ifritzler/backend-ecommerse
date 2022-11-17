import express from "express";
import productsRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import usersRouter from "./users.routes.js";

const api = express.Router();
api.use("/products", productsRouter);
api.use("/cart", cartRouter);
api.use('/users', usersRouter)
export default api;
