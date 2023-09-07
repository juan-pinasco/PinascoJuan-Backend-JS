import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  rol: String,
});

const userModel = mongoose.model(collection, schema);
export default userModel;
