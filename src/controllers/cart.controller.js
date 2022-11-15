import { CartCreateDTO } from "../dto/cart.dto.js";
import { ProductResponseDTO } from "../dto/products.dto.js";
import cartService from "../services/cart.service.js";

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

  // Endpoint finalizado. Obtiene los productos de un carrito por su id
  async getProducts(req, res) {
    const { id } = req.params;
    const cart = await this.service.getById(id);
    res.status(200).json({ data: cart.products });
  }

  // /api/carrito/:id/productos POST
  async addProductToCart(req, res) {
    // cartId, productId, quantity

    const { id } = req.params;
    const product = new ProductResponseDTO().validate(req.body);
    const cart = await this.service.getById(id);

    cart.products.push(product);

    const newCart = await this.service.edit(id, cart);
    return res.status(200).json(newCart);
  }

}

export default new CartController(cartService);
