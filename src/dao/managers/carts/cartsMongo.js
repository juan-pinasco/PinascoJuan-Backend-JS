import { cartsModel } from "../../db/models/carts.models.js";

class CartsMongo {
  async getCarts() {
    try {
      const carts = await cartsModel.find({});
      return carts;
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(id);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async createCart(obj) {
    try {
      const newCart = await cartsModel.create(obj);
      return newCart;
    } catch (error) {
      return error;
    }
  }

  async updateCart(id) {
    try {
      const response = await cartsModel.findByIdAndUpdate(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  /*   async updateCart(id, obj) {
    try {
      const response = await cartsModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  } */

  async deleteCart(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const cartsMongo = new CartsMongo();
