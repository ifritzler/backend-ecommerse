import express from "express";
import cartController from "../controllers/cart.controller.js";
import { notBodyEmpty } from "../middlewares/notBodyEmpty.js";
import HttpError from "../utils/HttpError.js";

const router = express.Router();

// Guarda un carrito. en caso de no recibir productos por body, la propiedad productos sera un arreglo vacio
router.post('/', notBodyEmpty, async (req, res) => {
  await cartController.save(req, res)
})

// Elimina por completo un carrito
router.delete('/:id', async (req, res) => {
  await cartController.remove(req, res)
})

// Obtiene todos los productos de un carrito por id
router.get('/:id/products', async (req, res) => {
  await cartController.getProducts(req, res)
})

// Guarda un producto con su cantidad en el carrito por su id
router.post('/:id/products', (req, res) => {
  throw new HttpError('Endpoint no implementado', 500)
})

// Elimina un producto en el carrito por su id
router.delete('/:id/products/:idProd', (req, res) => {
  throw new HttpError('Endpoint no implementado', 500)
})
export default router;
