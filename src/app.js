const express = require("express");
const app = express(); 
const PUERTO = 8080; 
const productRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");

//middleware para poder recibir formato json
app.use(express.json())

// Rutas

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

//Listen 

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})