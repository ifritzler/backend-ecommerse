import _ from "lodash";
import { ProductResponseDTO } from "./products.dto.js";

const productResponseDTO = new ProductResponseDTO();

export class CartCreateDTO {
  constructor() {}

  validate(cart) {
    if (!_.isNil(cart.products) && !_.isArray(cart.products))
      throw new Error(
        'the "products" field within the cart object must be an array'
      );

    if(_.isNil(cart.products)) throw new Error('field products must be present in cart entity')

    const productsError = [];
    cart.products.forEach((product, idx) => {
      try {
        productResponseDTO.validate(product);
      } catch (err) {
        productsError.push({ index: idx, error: err.message });
      }
    });

    if (!_.isEmpty(productsError)) throw new Error(JSON.stringify(productsError));

    return {
      products: cart.products,
    };
  }
}