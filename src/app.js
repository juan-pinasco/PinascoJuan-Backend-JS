import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/session.router.js";
import { __dirname } from "./utils.js";

const app = express(); //app conectado con serv express

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); //para poder acceder a nuestra carpeta publica

//mongoose
const connection = mongoose.connect(
  "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority"
);

//mongoStore
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://juanpinascoprogramacion:juanpinascoprogramacion@cluster0.46weonh.mongodb.net/Ecommerce?retryWrites=true&w=majority",
      //ttl: 3600, // ==> esta en segundos //==> si borramos ttl, por defecto mongo te da 14 dias
      //colectionName:nombre de coleccion //==> esto es por si queremos hacer una cellection en mongo personalizada, pero por defecto la hace sola
    }),
    secret: "desafioDeClase",
    resave: false,
    saveUninitialized: false,
  })
);

//route
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

//puerto
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
