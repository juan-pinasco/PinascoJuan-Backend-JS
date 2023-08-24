import { Router } from "express";
import { cartsMongo } from "../dao/managers/carts/cartsMongo.js";
import cartManager from "../dao/managers/carts/cartsManager.js";
const router = Router();

const cartControllerManager = new cartManager("./Carrito.json");

//get
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const carts = await cartManager.getCartById(+cid);
    res.status(200).json({ message: "carts", carts });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//post
router.post("/", async (req, res) => {
  try {
    const creatCart = await cartControllerManager.createCart();
    res.status(200).json({ message: "carrito creado", cart: creatCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//post
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const addProduct = await cartControllerManager.addProduct(+cid, +pid);
    res.status(200).json({ message: "producto-carrito", carrito: addProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
