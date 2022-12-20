import fakeProductService from "../services/fakeProducts.service.js";

class FakeProductsController {
  constructor(service) {
    this.service = service;
  }

  async all(_req, res) {
    const products = await this.service.all();
    return res.status(200).json({ data: products });
  }
}

export default new FakeProductsController(fakeProductService);
