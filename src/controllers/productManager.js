const { error } = require("console");

const fs = require("fs").promises;

class ProductManager {

    static ultId = 0;

    
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({title, description, price, img, code, stock, category, thumbnails}) {
        
        if (!title || !description || !price || !img || !code || !stock ||!category) {
            console.log("Todos los campos son obligatorios");
            return;
        } 

        this.products = await this.leerArchivo();
        
        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            throw new Error("El codigo debe ser unico");
        }

        if(this.products.length === 0){
            const nuevoProducto = {
                id: ++ProductManager.ultId,
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            }
    
            this.products.push(nuevoProducto);
    
            await this.guardarArchivo(this.products);
        }else{
            let ID = this.products[this.products.length - 1].id;
            const nuevoProducto = {
                id: ++ID,
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            }
    
            this.products.push(nuevoProducto);
    
            await this.guardarArchivo(this.products);
        }

        
    }

    async getProducts() {
        const arrayProductos = await this.leerArchivo();
        return arrayProductos;
    }

    async getProductById(id) {

        const arrayProductos = await this.leerArchivo();
        const buscado = arrayProductos.find(item => item.id === id);

        if (!buscado) {
            return "Product not found";
        } else {
            return buscado;
        }
    }

    async update(id, {  
                        title,
                        description,
                        price,
                        img,
                        code,
                        stock,
                        category,
                        status,
                        thumbnails
                    }){
        
        try{
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item => item.id === parseInt(id));
            const product = arrayProductos[index];
            const changes = {title: title || product.title,
                description: description || product.description,
                price: price || product.price,
                img: img || product.img,
                code: code || product.code,
                stock: stock || product.stock,
                category: category || product.category,
                status: status || product.status,
                thumbnails: thumbnails || product.thumbnails};
            const productUpdate = {
              ...product,
              ...changes
            };
            arrayProductos.splice(index, 1, productUpdate);
            await this.guardarArchivo(arrayProductos);
            return productUpdate;
          }catch(error){
            return {message: error.message};
          }
    }

    async delete(id){
        const arrayProductos = await this.leerArchivo();
        const index = arrayProductos.findIndex(item => item.id === parseInt(id));
        if(index === -1){
          throw new Error('product not found')
        }
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);
        return { id };

    }

    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }


}

module.exports = ProductManager; 
