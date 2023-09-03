import mongoose from "mongoose";

const URI =
  /* "mongodb+srv://leocapone:Coderhouse1!@cluster0.9q8ynid.mongodb.net/?retryWrites=true&w=majority"; */
  "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));
