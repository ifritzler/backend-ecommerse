import _ from "lodash";

// Validacion de productos al momento de ser ingresada la data por el req.body
class ProductSaveDTO {
  constructor() {}

  validate(product) {
    const emptyFields = [];
    
    // Valido que el producto tenga todas sus propiedades
    if (_.isNil(product.title)) emptyFields.push("title");
    if (_.isNil(product.description)) emptyFields.push("description");
    if (_.isNil(product.code)) emptyFields.push("code");
    if (_.isNil(product.price)) emptyFields.push("price");
    if (_.isNil(product.stock)) emptyFields.push("stock");
    if (_.isNil(product.thumbnail)) emptyFields.push("thumbnail");

    if (!_.isEmpty(emptyFields))
      throw new Error(
        "Product fields empty: " + _.join(emptyFields, ",")
      );

    return {
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    };
  }
}

// Validacion de productos al momento de ser ingresada la data por el req.body en el metodo PUT
class ProductEditDTO {
  constructor() {}

  validate(product) {

    if (!_.isNil(product.title)) this.title = product.title;
    if (!_.isNil(product.description)) this.description = product.description;
    if (!_.isNil(product.code)) this.code = product.code;
    if (!_.isNil(product.price)) this.price = product.price;
    if (!_.isNil(product.stock)) this.stock = product.stock;
    if (!_.isNil(product.thumbnail)) this.thumbnail = product.thumbnail;

    return {
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    };
  }
}

class ProductResponseDTO {
  constructor() {}

  validate(product) {
    const emptyFields = [];
    // Valido que el producto tenga todas sus propiedades
    if (_.isNil(product.id)) emptyFields.push("id");
    if (_.isNil(product.title)) emptyFields.push("title");
    if (_.isNil(product.description)) emptyFields.push("description");
    if (_.isNil(product.code)) emptyFields.push("code");
    if (_.isNil(product.price)) emptyFields.push("price");
    if (_.isNil(product.stock)) emptyFields.push("stock");
    if (_.isNil(product.thumbnail)) emptyFields.push("thumbnail");
    if (_.isNil(product.timestamp)) emptyFields.push("timestamp");

    if (!_.isEmpty(emptyFields))
    throw new Error(
      "Product fields empty: " + _.join(emptyFields, ",")
    );

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
      timestamp: product.timestamp,
    };
  }
}

export { ProductSaveDTO, ProductEditDTO, ProductResponseDTO };
