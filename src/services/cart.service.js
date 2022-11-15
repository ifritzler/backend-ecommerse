import FileSystemContainer from "../db/FileSystemContainer.js";
import HttpError from "../utils/HttpError.js";

class CartService {
  constructor() {
    this.repository = new FileSystemContainer("cart.txt");
  }
  async getById(id) {
    try {
      const cart = await this.repository.getById(id);
      if (!cart) throw new HttpError(`Cart with id ${id} not found`, 404);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async save(cart) {
    try {
      const newCart = await this.repository.save(cart);
      return newCart;
    } catch (error) {
      throw error;
    }
  }
  async edit(id, changes) {
    try {
      return await this.repository.edit(id, changes);
    } catch (error) {
      throw error;
    }
  }
  async remove(id) {
    try {
      await this.repository.remove(id);
      // Emitir a todos los clientes el nuevo producto creado para su actualizacion en la UI
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();
