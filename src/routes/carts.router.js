import { Router } from "express";
import { cartsMongo } from "../dao/managers/carts/cartsMongo.js";
/* import cartManager from "../dao/managers/carts/cartsManager.js"; */
const router = Router();

/* const cartControllerManager = new cartManager("./Carrito.json");

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
 */

// MONGO

router.get("/", async (req, res) => {
  try {
    const carts = await cartsMongo.getCarts();
    if (carts.length) {
      res.status(200).json({ message: "carts", carts });
    } else {
      res.status(200).json({ message: "No carts found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsMongo.getCartById(cid);
    if (!cart._id) {
      res.status(400).json({ message: "Invalid CID" });
    } else {
      res.status(200).json({ message: "cart found", cart });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { title, price, quantity } = req.body;
  if (!title || !price || !quantity) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const nuevoCart = await cartsMongo.createCart(req.body);
    res.status(200).json({ message: "carrito creado", mesagge: nuevoCart });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await cartsMongo.deleteCart(cid);
    res.status(200).json({ message: "carrito borrado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartUpdated = await cartsMongo.updateCart(cid, req.body);
    res.status(200).json({ message: "carrito actualizado", cartUpdated });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
