import { socketInstance } from "../app.js";
import FileSystemContainer from "../db/FileSystemContainer.js";
import HttpError from "../utils/HttpError.js";

class ProductService {
  constructor() {
    this.repository = new FileSystemContainer("products.txt");
  }

  async all() {
    try {
      return await this.repository.all();
    } catch (error) {
      return [];
    }
  }
  async getById(id) {
    try {
      // if (!entity)
      const product = await this.repository.getById(id);
      if (!product) throw new HttpError(`Product with id ${id} not found`, 404);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async save(product) {
    try {
      const newProduct = await this.repository.save(product);

      // Emitir a todos los clientes el nuevo producto creado para su actualizacion en la UI
      socketInstance.emitEvent("new_product", newProduct);
      return newProduct;
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
      socketInstance.emitEvent("delete_product", id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
