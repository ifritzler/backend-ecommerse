import express from "express";
import cartController from "../controllers/cart.controller.js";
import { notBodyEmpty } from "../middlewares/notBodyEmpty.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await cartController.all(req, res);
  } catch (err) {
    next(err);
  }
});

// Guarda un carrito. en caso de no recibir productos por body, la propiedad productos sera un arreglo vacio
router.post("/", async (req, res, next) => {
  try {
    await cartController.create(req, res);
  } catch (err) {
    next(err);
  }
});

// Elimina por completo un carrito
router.delete("/:id", async (req, res, next) => {
  try {
    await cartController.remove(req, res);
  } catch (err) {
    next(err);
  }
});

// Obtiene todos los productos de un carrito por id
router.get("/:id/products", async (req, res, next) => {
  try {
    await cartController.getProducts(req, res);
  } catch (err) {
    next(err);
  }
});

// Guarda un producto con su cantidad en el carrito por su id
router.post("/:id/products", notBodyEmpty, async (req, res, next) => {
  try {
    await cartController.addProductToCart(req, res);
  } catch (err) {
    next(err);
  }
});

// Elimina un producto en el carrito por su id
router.delete("/:cartId/products/:prodId", async (req, res, next) => {
  try {
    await cartController.deleteProductInCart(req, res);
  } catch (err) {
    next(err);
  }
});
export default router;
