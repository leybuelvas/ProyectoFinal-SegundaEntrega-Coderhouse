import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super('productos', {
            title: { type: String, required: true },    
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        });
    }
}

export default ProductosDaoMongoDB;