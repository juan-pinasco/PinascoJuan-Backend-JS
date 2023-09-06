import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import mongoose from "mongoose";

const app = express(); //app conectado con serv express

const connection = mongoose.connect(
  "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority"
);

app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority",
      //ttl: 30, // ==> esta en segundos //==> si borramos ttl, por defecto mongo te da 14 dias
      //colectionName:nombre de coleccion //==> esto es por si queremos hacer una cellection en mongo personalizada, pero por defecto la hace sola
    }),
    secret: "desafioDeClase",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  req.session.papa = { conqueso: true };
  res.send("ok");
});

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
