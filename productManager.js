const fs = require("fs");

class productManager {
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
        id = productsPrev[productsPrev.length - 1].id + 1;
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

//cuerpos de productos
const producto1 = {
  title: "1er producto prueba",
  description: "este es un 1er producto prueba",
  price: 200,
  thumbmail: "sin imagen",
  code: "abc123",
  stock: 25,
};
const producto2 = {
  title: "2do producto prueba",
  description: "este es un 2do producto prueba",
  price: 300,
  thumbmail: "sin imagen",
  code: "abc111",
  stock: 30,
};
const producto3 = {
  title: "3er producto prueba",
  description: "este es un 3er producto prueba",
  price: 400,
  thumbmail: "sin imagen",
  code: "abc112",
  stock: 10,
};
const objModif = {
  title: "2do producto modificado",
  description: "este es un 2do producto prueba que se modifico",
};

//Ejecucion
async function prueba() {
  const manager = new productManager("productos.json");
  await manager.addProduct(producto1);
  const products = await manager.getProducts();
  console.log(products);
  await manager.addProduct(producto2);
  await manager.addProduct(producto3);
  const productss = await manager.getProducts();
  console.log(productss);
  const productoId = await manager.getProductById(1);
  console.log(productoId);
  await manager.deleteProduct(3);
  const getProductosSinProducto3 = await manager.getProducts();
  console.log(getProductosSinProducto3);
  await manager.updateProduct(2, objModif);
  const getProductosConP2Modificado = await manager.getProducts();
  console.log(getProductosConP2Modificado);
}

prueba();
