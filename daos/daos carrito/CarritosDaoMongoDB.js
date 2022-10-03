import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('carritos', {
        productos: { type: Array, required: true },
    });
  }
  async save(carrito = {productos: []}) {
    return super.save(carrito);
  }
}

export default CarritosDaoMongoDB;