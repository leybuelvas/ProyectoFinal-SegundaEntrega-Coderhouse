import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class ProductosDaoMem extends ContenedorMemoria {
    constructor() {
        super('productos');
    }
}

export default ProductosDaoMem;