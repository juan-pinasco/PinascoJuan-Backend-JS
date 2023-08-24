import mongoose from "mongoose";

const URI =
  "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/integradora43400DB?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("conectado a la base de datos"))
  .catch((error) => console.log(error));
