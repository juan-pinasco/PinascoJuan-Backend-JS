import { Router } from "express";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { __dirname } from "../utils.js";
const router = Router();

//get todos
/* router.get("/", async (req, res) => {
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
}); */
//para paginate el if y else no van.  por eso comento el de get de arriba y hago el nuevo de abajo.(clase 17)
router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.getProducts(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get por id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsMongo.getProductById(pid);
    if (!product._id) {
      res.status(400).json({ message: "Invalid PID" });
    } else {
      res.status(200).json({ message: "Product found", product });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

//post
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

//delete por id
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const response = await productsMongo.deleteProduct(pid);
    res.status(200).json({ message: "producto borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//update por id
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productUpdated = await productsMongo.updateProduct(pid, req.body);
    res.status(200).json({ message: "producto actualizado", productUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//clase 16. anulo get de arriba y pongo el siguiente
/* router.get("/", async (req, res) => {
  const obj = { _id: "64ee0acdcd7cf5eb640d8e9e" };
  const products = await productsMongo.findOne(obj);
  res.json({ products });
}); */

//clase 17. anulo get de clase 16(indexacion) y pongo el siguiente. (tema: aggregation)
/* router.get("/aggregation", async (req, res) => {
  const response = await productsMongo.aggregationMet();
  res.json({ response });
});
 */
export default router;
