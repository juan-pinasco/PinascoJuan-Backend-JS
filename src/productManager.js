import fs from "fs";

class productsManager {
  constructor(path) {
    this.path = path;
  }

  //metodos
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProducts = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(infoProducts);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(objProduct) {
    try {
      const productsPrev = await this.getProducts();
      let id;
      if (!productsPrev.length) {
        id = 1;
      } else {
        id = productsPrev.length + 1;
      }
      productsPrev.push({ ...objProduct, id });
      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const productPrev = await this.getProducts();
      const product = productPrev.find((p) => p.id === id);
      if (!product) {
        return "producto con id no encontrado";
      } else {
        return product;
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const productPrev = await this.getProducts();
      const productoPorSuIndex = productPrev.findIndex((p) => p.id === id);
      if (productoPorSuIndex === -1) {
        return "no hay producto con ese id";
      } else {
        const product = productPrev[productoPorSuIndex];
        productPrev[productoPorSuIndex] = { ...product, ...obj };
        await fs.promises.writeFile(this.path, JSON.stringify(productPrev));
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const productPrev = await this.getProducts();
      const nuevoArrayConProductoEliminado = productPrev.filter(
        (p) => p.id !== id
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(nuevoArrayConProductoEliminado)
      );
    } catch (error) {
      return error;
    }
  }
}

export default productsManager;
