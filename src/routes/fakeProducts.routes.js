import express from "express";
import fakeProductsController from "../controllers/fakeProducts.controller.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await fakeProductsController.all(req, res);
  } catch (err) {
    next(err);
  }
});


export default router;
