import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  rol: { type: String },
  fromGithub: {
    type: Boolean,
    default: true,
  },
});

const userModel = mongoose.model(collection, schema);
export default userModel;
