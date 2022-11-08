import express from "express";
import productService from "../services/products.service.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const products = await productService.all();
    res.render("index", { products, messages: [] });
  } catch (err) {
    next(err);
  }
});


export default router;
