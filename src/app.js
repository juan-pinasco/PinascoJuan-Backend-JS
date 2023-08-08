import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import productsManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

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
