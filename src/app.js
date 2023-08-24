import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import productsManager from "./dao/managers/products/productManager.js";
import "./dao/db/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//handlebars
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);

//puerto
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const mensajes = [];

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  //-----------------chat---------------------------
  socket.on("mensaje", (infoMensaje) => {
    mensajes.push(infoMensaje);
    socketServer.emit("mensajeParaTodos", mensajes);
  });
  //------------------------------------------------
  const controllerManager = new productsManager("./productos.json");

  socket.on("agregar", async (objProd) => {
    const opAdd = await controllerManager.addProduct(objProd);
    if (opAdd.operation) {
      socketServer.emit("added", opAdd.nuevoProducto);
    } else {
      socket.emit("added", opAdd.message);
    }
  });

  socket.on("eliminar", async (id) => {
    const opDel = await controllerManager.deleteProduct(id);
    if (opDel.operation) {
      socketServer.emit("deleted", opDel.modData);
    } else {
      socket.emit("deleted", opDel.message);
    }
  });
});

/* socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
}); */
