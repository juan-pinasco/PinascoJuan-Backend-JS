import { Router } from "express";
import { productsMongo } from "../managers/products/ProductsMongo.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await productsMongo.getProducts();
  res.render("products", products);
});

router.get("/carts", (req, res) => {
  // cambiar ruta a /carts/:cid
  res.render("carts");
});

export default router;
