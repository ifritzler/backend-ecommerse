import { faker } from "@faker-js/faker";

class FakeProductService {
  _generateFake(id) {
    const title = faker.commerce.product();
    const price = faker.commerce.price();
    const thumbnail = faker.image.unsplash.imageUrl(150,150,undefined,title);
    return { id, title, price, thumbnail };
  }
  _generateFakes(quantity) {
    const fakes = [];
    for (let i = 0; i < quantity; i++) {
      fakes.push(this._generateFake(i + 1));
    }
    return fakes;
  }

  async all() {
    try {
      const fakeProducts = this._generateFakes(5);
      return fakeProducts;
    } catch (error) {
      return [];
    }
  }
}

export default new FakeProductService();
