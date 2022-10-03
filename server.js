import express from 'express';
import *  as dotenv from 'dotenv'
dotenv.config()
const {Router} = express;

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from './daos/index.js';

/*-------instancia del servidor------*/
const app = express();

/*
 * Si el usuario no es administrador, devuelve un objeto de error. De lo contrario, llame a la
 * siguiente función en la cadena.
 */
const admin = true;

function siNoadmin(ruta, metodo)  {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta ${ruta} método ${metodo} no autorizada`;
    } else {
        error.descripcion = 'No autorizado';
    }
    return error;
}


function soloAdmins(req, res, next) {
    if (!admin) {
       res.json(siNoadmin())
    } else {
        next();
    }
}

/*------Configuracion de router de productos------*/
const productosRouter = Router();

productosRouter.get('/', async (req, res) => {
    const productos = await productosApi.listarTodos();
    res.json(productos);
});

productosRouter.get('/:id', async (req, res) => {
    res.json(await productosApi.listar(req.params.id));
});

productosRouter.post('/', soloAdmins, async (req, res) => {
    res.json(await productosApi.guardar(req.body));
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.actualizar(req.body));
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await productosApi.borrar(req.params.id));
});



/*------Configuracion de router de carritos------*/
const carritosRouter = new Router();

carritosRouter.get('/', async (req, res) => {
    res.json(await carritosApi.listarTodos()).map(carrito => carrito.id);
});

carritosRouter.post('/', async (req, res) => {
    res.json(await carritosApi.guardar());
});

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await carritosApi.borrar(req.params.id));
});



/*------Configuracion de productos en carritos------*/
carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    res.json(carrito.productos);
});

carritosRouter.post('/:id/productos', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.id);
    const producto = await productosApi.listar(req.body.id);
    carrito.productos.push(producto);
    await carritosApi.actualizar(carrito);
    res.end();
});

carritosRouter.delete('/:idCarrito/productos/:idProducto', async (req, res) => {
    const carrito = await carritosApi.listar(req.params.idCarrito);
    const producto = await productosApi.listar(req.params.idProducto);
    res.json(await carritosApi.borrarProducto(carrito, producto));
});

