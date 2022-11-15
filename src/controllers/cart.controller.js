import cartService from "../services/cart.service.js";
import productsService from "../services/products.service.js";

class CartController {
  constructor(service) {
    this.service = service;
  }
  async getById(req, res) {
    const { id } = req.params;
    const cart = await this.service.getById(id);
    res.status(200).json({ data: cart });
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

  async create(req, res) {
    const product = req.body;
    const newProduct = await this.service.save(product);
    res.status(201).json(newProduct);
  }
  async edit(req, res) {
    const changes = req.body;
    const { id } = req.params;
    const product = await this.service.edit(id, changes);
    res.status(200).json({ data: product });
  }
  async remove(req, res) {
    const { id } = req.params;
    await this.service.remove(id);
    res.status(204).send();
  }
}

export default new CartController(cartService);
