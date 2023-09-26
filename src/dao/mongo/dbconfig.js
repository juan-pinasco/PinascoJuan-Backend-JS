import mongoose from "mongoose";

const URI =
  "mongodb+srv://juanpinascoprogramacion:3z6WLzc1Oe6kAjAg@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos de mongodb"))
  .catch((error) => console.log(error));
