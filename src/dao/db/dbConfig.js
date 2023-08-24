import mongoose from "mongoose";

const URI =
  "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("conectado a la base de datos"))
  .catch((error) => console.log(error));
