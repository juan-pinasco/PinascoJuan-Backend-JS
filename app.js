import express from "express";
import productsManager from "./productManager";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.get("/api/products", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
    res.status(200).json({ message: "productos", products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("escuchando al puerto 8080");
});
