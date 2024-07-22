const fs = require("fs").promises;

class CartManager{
    static ID = 0;

    constructor(path){
        this.path = path;
        this.carts = [];
    }

    async createCart(){
        //CartManager.ID = CartManager.ID + 1;
        const carts = await this.leerArchivo();
        if(carts.length === 0){
            const cart = {
                id: ++CartManager.ID,
                products: []
            }
    
            carts.push(cart);
            await this.escribirArchivo(carts);
            return cart;
        }else{
            let lastId = carts[carts.length - 1].id;
            const cart = {
                id: ++lastId,
                products: []
            }
    
            carts.push(cart);
            await this.escribirArchivo(carts);
            return cart;
        }

        
    }

    async getCart(id){
        const carts = await this.leerArchivo();
        const index = carts.findIndex(item => item.id === id);
        return carts[index];
    }

    async addProduct(idc, idp){
        const carts = await this.leerArchivo();
        const carroBuscado = carts.find(item => item.id === parseInt(idc));
        if(!carroBuscado){
            return "Carrito no encontrado";
        }else{
            const producto = carroBuscado.products.find(item => item.product === idp);
            if(!producto){
                carroBuscado.products.push({product: idp, quantity: 1});
                await this.escribirArchivo(carts);
                return carroBuscado.products;
            }else{
                const index = carroBuscado.products.findIndex(item => item.product === idp);
                if(index === -1){
                    return "No se encontro el indice del producto";
                }else{
                    carroBuscado.products[index].quantity = carroBuscado.products[index].quantity + 1;
                    await this.escribirArchivo(carts);
                    return carroBuscado.products[index]; 
                }
            }
        }
        
    }

    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const carts = JSON.parse(respuesta);
        return carts;
    }

    async escribirArchivo(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }
}

module.exports = CartManager;