import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria {
    constructor() {
        super('carritos');
    }

    async guardar(carrito = {productos: []}) {
        return super.guardar(carrito);
    }
}

export default CarritosDaoMem;