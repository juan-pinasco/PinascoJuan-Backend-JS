import { Router } from "express";
import { messagesMongo } from "../dao/managers/messages/messagesMongo.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await messagesMongo.getMessages();
    if (messages.length) {
      res.status(200).json({ message: "messages", messages });
    } else {
      res.status(200).json({ message: "No messages found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:mid", async (req, res) => {
  const { mid } = req.params;
  try {
    const message = await messagesMongo.getMessageById(mid);
    if (!message._id) {
      res.status(400).json({ message: "Invalid MID" });
    } else {
      res.status(200).json({ message: "Message found", message });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { correoDelUsuario, mensajeDelUsuario } = req.body;
  if (!correoDelUsuario || !mensajeDelUsuario) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const nuevoMensaje = await messagesMongo.addMessage(req.body);
    res.status(200).json({ message: "mensaje creado", mesagge: nuevoMensaje });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:mid", async (req, res) => {
  const { mid } = req.params;
  try {
    const response = await messagesMongo.deleteMessage(mid);
    res.status(200).json({ message: "mensaje borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:mid", async (req, res) => {
  const { mid } = req.params;
  try {
    const messageUpdated = await messagesMongo.updateMessage(mid, req.body);
    res.status(200).json({ message: "mensaje actualizado", messageUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
