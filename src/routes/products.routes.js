import express from "express";
import productsController from "../controllers/products.controller.js";
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await productsController.all(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await productsController.getById(req, res);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    await productsController.save(req, res);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    await productsController.edit(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    await productsController.remove(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
