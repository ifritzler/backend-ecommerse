import FileSystemContainer from "../db/FileSystemContainer.js";

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
      return await this.repository.getById(id);
    } catch (error) {
      throw new Error(`Product with id ${id} not found`);
    }
  }
  async save(product) {
    try {
      return await this.repository.save(product);
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
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
