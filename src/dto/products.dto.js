import _ from "lodash";
import HttpError from "../utils/HttpError.js";

class ProductSave {
  constructor(product) {
    const emptyFields = [];
    if (_.isEmpty(product)) throw new HttpError("Product cannot be empty", 400);
    if (_.isNil(product.title)) emptyFields.push("title");
    if (_.isNil(product.price)) emptyFields.push("price");
    if (_.isNil(product.thumbnail)) emptyFields.push("thumbnail");

    if (!_.isEmpty(emptyFields))
      throw new HttpError(
        "Product fields empty: " + _.join(emptyFields, ","),
        400
      );

    this.title = product.title;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
  }
}

class ProductEdit {
  constructor(product) {
    if (_.isEmpty(product)) throw new HttpError("Product cannot be empty", 400);

    if(!_.isNil(product.title)) this.title = product.title;
    if(!_.isNil(product.price)) this.price = product.price;
    if(!_.isNil(product.thumbnail)) this.thumbnail = product.thumbnail;
  }
}

export { ProductSave, ProductEdit };
