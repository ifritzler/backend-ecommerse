import { CartCreateDTO } from "../dto/cart.dto.js";
import cartService from "../services/cart.service.js";
import productsService from "../services/products.service.js";

const cartCreateValidator = new CartCreateDTO();
class CartController {
  constructor(service) {
    this.service = service;
  }

  // Endpoint finalizado. Guarda un carrito y devuelve un id
  async save(req, res) {
    const cart = cartCreateValidator.validate(req.body);
    const newCart = await this.service.save(cart);
    res.status(201).json(newCart.id);
  }

  // Endpoint finalizado. Elimina un carrito por completo por id
  async remove(req, res) {
    const { id } = req.params;
    await this.service.remove(id);
    res.status(204).send();
  }

  async getById(req, res) {
    const { id } = req.params;
    const cart = await this.service.getById(id);
    res.status(200).json({ data: cart });
  }

  async edit(req, res) {
    const changes = req.body;
    const { id } = req.params;
    const product = await this.service.edit(id, changes);
    res.status(200).json({ data: product });
  }

  // /api/carrito/:id/productos POST
  async saveProduct(req, res, next) {
    // cartId, productId, quantity
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;

      const cart = await cartService.getById(cartId);
      const product = await productsService.getById(productId);
      cart.products.push({ ...product, quantity });
      cartService.edit(cartId, cart);
      return res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }
}

export default new CartController(cartService);
