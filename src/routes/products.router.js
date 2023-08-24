import { Router } from "express";
import { productsMongo } from "../dao/managers/products/productsMongo.js";
import productsManager from "../dao/managers/products/productManager.js";
const router = Router();

const controllerManager = new productsManager("./productos.json");

//get
/* router.get("/", async (req, res) => {
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
}); */
//get mongo
router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.getProducts();
    if (products.length) {
      res.status(200).json({ message: "Products", products });
    } else {
      res.status(200).json({ message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//
//get id
/* router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await controllerManager.getProductById(+pid);
    res.status(200).json({ message: "productos", products });
  } catch (error) {
    res.status(500).json({ error });
  }
}); */
//get id mongo
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsMongo.getProductById(pid);
    if (!product) {
      res.status(400).json({ message: "Invalid PID" });
    } else {
      res.status(200).json({ message: "Product found", product });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//
//post
/* router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const nuevoProducto = await controllerManager.addProduct(req.body);
    res
      .status(200)
      .json({ message: "producto creado", product: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error });
  }
}); */
//post mongo
router.post("/", async (req, res) => {
  const { title, description, price, stock, code, category } = req.body;
  if (!title || !description || !price || !stock || !code || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const nuevoProducto = await productsMongo.addProduct(req.body);
    res
      .status(200)
      .json({ message: "producto creado", product: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//
//delete
/* router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const response = await controllerManager.deleteProduct(+pid);
    res.status(200).json({ message: "producto borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
}); */
//delete mongo
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const response = await productsMongo.deleteProduct(pid);
    res.status(200).json({ message: "producto borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//
//update
/* router.put("/:pid", async (req, res) => {
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
}); */
//update mongo
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await productsMongo.updateProduct(pid, req.body);
    res.status(200).json({ message: "producto actualizado", productUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
