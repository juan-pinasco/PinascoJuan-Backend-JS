import { Router } from "express";
import productsManager from "../ProductManager.js";

const router = Router();
const controllerManager = new productsManager("./productos.json");

router.get("/", async (req, res) => {
  const products = await controllerManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await controllerManager.getProducts();
  res.render("realTimeProducts", { products });
});

export default router;
