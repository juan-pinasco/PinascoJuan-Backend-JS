import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import "./db/dbConfig.js";
import viewsRouter from "./routes/views.router.js"; //handlebars
import { Server } from "socket.io";
import { productsMongo } from "./managers/products/ProductsMongo.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter);

//
//
//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//puerto
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

/* const arrayProductos = [
  {
    title: "hrv",
    description: "origen asiatico",
    price: 300,
    stock: 23,
    code: "d2",
    category: "Honda",
  },
  {
    title: "CRV",
    description: "origen asiatico",
    price: 300,
    stock: 23,
    code: "d2",
    category: "Honda",
  },
]; */

socketServer.on("connection", async (socket) => {
  console.log("cliente conectado", socket.id);

  const arrayProductos = await productsMongo.getProducts();
  console.log(arrayProductos);
  socketServer.emit("arreglo de productos", arrayProductos);

  /* socketServer.emit("arreglo de productos", arrayProductos); */
});
