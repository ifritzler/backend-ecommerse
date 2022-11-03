import ProductService from "../services/products.service.js";

class ProductsController {
  constructor(service) {
    this.service = service;
  }

  async all(_req, res) {
    const products = await this.service.all();
    return res.status(200).json({ data: products });
  }
  async getById(req, res) {
    const { id } = req.params;
    const product = await this.service.getById(id);
    res.status(200).json({ data: product });
  }
  async save(req, res) {
    const product = req.body;
    const newProduct = await this.service.save(product);
    res.status(201).json({ data: newProduct });
  }
  async edit(req, res) {
    const changes = req.body;
    const { id } = req.params;
    const product = await this.service.edit(id, changes);
    res.status(200).json({ data: product });
  }
  async remove(_req, res) {
    await this.service.remove(id);
    res.status(204).send();
  }
}

export default new ProductsController(new ProductService());
