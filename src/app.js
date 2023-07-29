import express from "express";

import productsManager from "./productManager.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const controllerManager = new productsManager("./products.json");

//rutas
//get
app.get("/api/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const allProducts = await controllerManager.getProducts();

    if (!isNaN(limit) && limit > 0) {
      const limitedProducts = allProducts.slice(0, limit);
      res.status(200).json({ message: "productos", products: limitedProducts });
    } else {
      res.status(200).json({ message: "productos", products: allProducts });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await controllerManager.getProductById(+pid);
    res.status(200).json({ message: "productos", products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//post
app.post("/api/products", async (req, res) => {
  console.log(req.body);
  try {
    const nuevoProducto = await controllerManager.addProduct(req.body);
    res
      .status(200)
      .json({ message: "producto creado", product: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//delete
app.delete("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const response = await controllerManager.deleteProduct(+pid);
    res.status(200).json({ message: "producto borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//update
app.put("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await controllerManager.updateProduct(
      +pid,
      req.body
    );
    res.status(200).json({ message: "producto actualizado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("escuchando al puerto 8080");
});
