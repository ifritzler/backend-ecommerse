import _ from "lodash";
import {
  ProductEditDTO,
  ProductResponseDTO,
  ProductSaveDTO,
} from "../dto/products.dto.js";
import productService from "../services/products.service.js";

const productResponseDTO = new ProductResponseDTO();
const productCreateDTO = new ProductSaveDTO();
const productEditDTO = new ProductEditDTO();

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
    const productValidate = productResponseDTO.validate(product);
    res.status(200).json({ data: productValidate });
  }
  async save(req, res) {
    const product = productCreateDTO.validate(req.body);
    const newProduct = await this.service.save(product);
    res.status(201).json(newProduct);
  }
  async edit(req, res) {
    const changes = productEditDTO.validate(req.body);
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

export default new ProductsController(productService);
