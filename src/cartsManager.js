import fs from "fs";

class cartManager {
  constructor(path) {
    this.path = path;
  }
  async getCarts() {
    if (fs.existsSync(this.path)) {
      const infoCarts = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(infoCarts);
    } else {
      return [];
    }
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((e) => e.id === id);
    return cart;
  }

  async createCart() {
    const cartsPrev = await this.getCarts();
    let id;
    if (!cartsPrev.length) {
      id = 1;
    } else {
      id = cartsPrev.length + 1;
    }
    const newCart = { products: [], id };
    cartsPrev.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev));
    return newCart;
  }

  async addProduct(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find((e) => e.id === cid);
    const productIndex = cart.products.findIndex((p) => p.product === pid);
    if (productIndex === -1) {
      cart.products.push({ product: pid, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return cart;
  }
}

export default cartManager;
