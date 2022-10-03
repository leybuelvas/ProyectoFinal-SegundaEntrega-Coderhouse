let productosDao
let carritosDao

switch (config.env.PERSISTENCIA) {
    case   'json' :
        const { default: ProductosDaoArchivo } = await import ( '../daos/daos producto/ProductosDaoArchivo.js' )
        const { default: CarritosDaoArchivo } = await import ( '../daos/daos carrito/CarritosDaoArchivo.js' )

        productosDao = new ProductosDaoArchivo ()
        caritasDao = new CarritosDaoArchivo ()
        break

    case   'firebase' :
        const { default: ProductosDaoFirebase } = await import ( '../daos/daos producto/ProductosDaoFirebase.js' )
        const { default: CarritosDaoFirebase } = await import ( '../daos/daos carrito/CarritosDaoFirebase.js' )

        productosDao = new ProductosDaoFirebase ()
        caritasDao = new CarritosDaoFirebase ()
        break

    case   'mongodb' :
        const { default: ProductosDaoMongoDB } = await import ( '../daos/daos producto/ProductosDaoMongoDB.js' )    
        const { default: CarritosDaoMongoDB } = await import ( '../daos/daos carrito/CarritosDaoMongoDB.js' )

        productosDao = new ProductosDaoMongoDB ()
        caritasDao = new CarritosDaoMongoDB ()
        break

    default :
    const { default: ProductosDaoMem } = await import ( '../daos/daos producto/ProductosDaoMem.js' )
    const { default: CarritosDaoMem } = await import ( '../daos/daos carrito/CarritosDaoMem.js')

    productosDao = new ProductosDaoMem ()
    carritosDao = new CarritosDaoMem ()
    break
}

export { productosDao, carritosDao }
