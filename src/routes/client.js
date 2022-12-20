import express from "express";
import messagesService from "../services/messages.service.js";
import productService from "../services/products.service.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const products = await productService.all();
    const messages = await messagesService.all();
    res.render("index", { products, messages });
  } catch (err) {
    next(err);
  }
});

router.get("/test-products", async (_req, res, next) => {
  try {
    res.render("test-products", {});
  } catch (err) {
    next(err);
  }
});


export default router;
