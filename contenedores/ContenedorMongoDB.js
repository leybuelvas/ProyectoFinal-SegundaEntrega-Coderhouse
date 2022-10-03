import moongose from 'mongoose';
import config from '../config';
import {asPOJO, renameField, removeField} from '../utils/objectUtils';

await moongose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDB {
    constructor(nombre, schema) {
        this.coleccion = moongose.model(nombre, schema);
    }

    async listar(id){
        try {
            let docs = await this.coleccion.find({'_id': id}, {_id: 0, __v: 0});
            if (docs.length === 0) {
                return 'Error: No se encontró el documento';
            } else {
                let result = renameField(asPOJO(docs[0]), '_id', 'id');
                return result;
            }
        } catch (error) {
            throw new error(`Error al listar por id: ${error}`);
        }
    }

    async listarTodos(){
        try {
            let docs = await this.coleccion.find({}, {_id: 0, __v: 0}).lean();
            docs = docs.map(doc => renameField(doc, '_id', 'id'));
            return docs;
        } catch (error) {
            throw new error(`Error al listar todos: ${error}`);
        }
    }

    async guardar(newObj){
        try {
            let doc = new this.coleccion.create(newObj);
            doc = asPOJO(doc);
            renameField(doc, '_id', 'id');
            removeField(doc, '__v');
            return doc;
        } catch (error) {
            throw new error(`Error al guardar: ${error}`);
        }
    }

    async actualizar(newObj){
        try {
            renameField(newObj, 'id', '_id');
            const { n, nModified } = await this.coleccion.replaceOne({'_id': newObj._id}, newObj);
            if ( n === 0 || nModified === 0 ) {
                throw new Error('Error al actualizar: No se encontró el documento');
            } else {
                renameField(newObj, '_id', 'id');
                removeField(newObj, '__v');
                return asPOJO(newObj);
            }
        } catch (error) {
            throw new error(`Error al actualizar: ${error}`);
        }
    }

    async borrar(id) {
        try {
            const { n } = await this.coleccion.deleteOne({'_id': id});
            if (n === 0) {
                throw new Error('Error al borrar: No se encontró el documento');
            } else {
                return 'Documento borrado';
            }
        } catch (error) {
            throw new error(`Error al borrar: ${error}`);
        }
    }

    async borrarTodos() {
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            throw new error(`Error al borrar todos: ${error}`);
        }
    }
}

export default ContenedorMongoDB;
