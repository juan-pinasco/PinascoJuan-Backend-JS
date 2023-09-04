import { Router } from "express";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { cartsMongo } from "../managers/carts/CartsMongo.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await productsMongo.getProducts();
  res.render("products", products);
});

router.get("/carts", async (req, res) => {
  const carts = await cartsMongo.getCarts();
  // cambiar ruta a /carts/:cid
  res.render("carts", carts);
});

export default router;
