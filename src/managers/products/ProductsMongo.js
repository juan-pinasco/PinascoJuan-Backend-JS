import { productsModel } from "../../db/models/products.model.js";

class ProductsMongo {
  /* async getProducts() {
    try {
      const products = await productsModel.find({});
      return products;
    } catch (error) {
      return error;
    }
  } */
  //hago un get products nuevo para paginate como el de abajo y comento el de arriba(clase 17)
  async getProducts() {
    try {
      const products = await productsModel.paginate({}, {});
      const info = {};
      return products;
    } catch (error) {
      return error;
    }
  }

  async addProduct(objProduct) {
    try {
      const newProduct = await productsModel.create(objProduct);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await productsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id);
      //const response = await productsModel.deleteOne({_id:id}) esto es lo mismo que hacer lo de arriba
      return response;
    } catch (error) {
      return error;
    }
  }

  //indexado clase 16  por ej para buscar por {name: "title"}
  /* async findOne(obj) {
    try {
      const product = await productsModel
        .findOne(obj)
        .explain("executionStats");
      return product;
    } catch (error) {
      return error;
    }
  } */

  //aggregation clase 17
  async aggregationMet() {
    try {
      const response = await productsModel.aggregate([{}]);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const productsMongo = new ProductsMongo();
