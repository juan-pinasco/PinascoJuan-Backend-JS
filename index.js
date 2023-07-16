class ProductManager {
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, thumbmail, code, stock) {
    if (!title || !description || !price || !thumbmail || !stock || !code) {
      console.log(`Por favor, complete todos los campos del producto`);
    } else {
      const validacionDeCodigo = this.products.find((e) => e.code === code);
      if (validacionDeCodigo) {
        console.log("Este codigo ya esta en uso");
      } else {
        let id;
        if (this.products.length === 0) {
          id = 1;
        } else {
          id = this.products[this.products.length - 1].id + 1;
        }
        const newProducts = {
          id,
          title,
          description,
          price,
          thumbmail,
          code,
          stock,
        };
        this.products.push(newProducts);
      }
    }
  }
  getProducts() {
    console.log(this.products);
  }
  getProductsById(e) {
    const buscarProductoPorId = this.products.find((p) => p.id === e);
    if (buscarProductoPorId) {
      return console.log(buscarProductoPorId);
    } else {
      return console.log("Not found");
    }
  }
}
const manager1 = new ProductManager();

console.log(manager1.getProducts());

manager1.addProduct(
  "producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(manager1.getProducts());

manager1.addProduct(
  "producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(manager1.getProductsById(1));
