import { messagesModel } from "../../db/models/messages.models.js";

class MessagesMongo {
  async getMessages() {
    try {
      const products = await messagesModel.find({});
      return products;
    } catch (error) {
      return error;
    }
  }

  async addMessage(objProduct) {
    try {
      const newProduct = await messagesModel.create(objProduct);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getMessageById(id) {
    try {
      const product = await messagesModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateMessage(id, obj) {
    try {
      const response = await messagesModel.updateOne({ _id: id }, { ...obj });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteMessage(id) {
    try {
      const response = await messagesModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const messagesMongo = new MessagesMongo();
