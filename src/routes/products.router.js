const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/data/productos.json");

router.get("/", async (req, res) => {
    
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        
        if(limit){
            res.send(arrayProductos.slice(0, limit));
        }else{
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
    
})

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 

    const producto = await manager.getProductById(parseInt(id)); 

    if( !producto ) {
        res.send("No se encuentra el producto deseado"); 
    } else {
        res.send({producto}); 
    }
})

router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        await manager.addProduct(newProduct);
        res.status(201).send({message: "Producto agregado exitosamente"});
    } catch (error) {
        res.status(500).send({status: "error", message: error.message});
        
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = await manager.update(id, body);
    res.json(product);
  })

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await manager.delete(id);
    res.json(rta);
  })
  



module.exports = router;