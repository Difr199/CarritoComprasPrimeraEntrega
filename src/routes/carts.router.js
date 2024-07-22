const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cartManager.js");
const manager = new CartManager("./src/data/carrito.json");

router.post("/", async (req, res) => {
    const cart = await manager.createCart();
    res.json(cart);
})

router.get("/:cid", async (req, res) => {
    let id = req.params.cid;

    const cart = await manager.getCart(parseInt(id));
    res.json(cart);
})

router.post("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    const product = await manager.addProduct(cid, pid);
    res.json(product);
})


module.exports = router;