import admin from "firebase-admin";
import config from '../config.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase {

   constructor(nombre) {
       this.coleccion = db.coleccion(nombre);
   }


    async listar(id){
        try {
            let doc = await this.coleccion.doc(id).get();
            if (doc.exists) {
                return doc.data();
            } else {
                return 'Error: No se encontró el documento';
            }
        } catch (error) {
            throw new error(`Error al listar por id: ${error}`);
        }
    }


    async listarTodos(){
        try {
            let result = [];
            let snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({id: doc.id, ...doc.data()});
            });
            return result;
        } catch (error) {
        throw new error(`Error al listar todos: ${error}`);
        }
    }


    async guardar(newObj){
        try {
            let doc = await this.coleccion.add(newObj);
            return doc.id;
        } catch (error) {
            throw new error(`Error al guardar: ${error}`);
        }
    }


    async actualizar(newObj){
        try {
            const update = await this.coleccion.doc(newObj.id).set(newObj);
            return update;
        } catch (error) {
            throw new error(`Error al actualizar: ${error}`);
        }
    }


    async borrar(id){
        try {
            let doc = await this.coleccion.doc(id).delete();
            return doc;
        } catch (error) {
            throw new error(`Error al borrar: ${error}`);
        }
    }

}

export default ContenedorFirebase;

