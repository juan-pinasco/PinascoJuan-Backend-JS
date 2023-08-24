import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  correoDelUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  mensajeDelUsuario: {
    type: String,
    required: true,
  },
});

export const messagesModel = mongoose.model("messages", messagesSchema);
