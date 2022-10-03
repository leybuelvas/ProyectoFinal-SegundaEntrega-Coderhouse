import fs from 'fs';

export class ContenedorArchivo {
    constructor(nombre){
        this.nombre = nombre;
    }

    async listar(id) {
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(id), 'utf8');
        } catch (error) {
            throw new Error(`Error al listar: ${error}`);
        }
    }

    async listarTodos() {
        try {
            const objs = await fs.readFile(this.nombre, 'utf8');
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }
    
    async guardar(newObj) {
        try {
            const objs = await this.listarTodos();
            const id = objs.length + 1;
            newObj.id = id;
            objs.push(newObj);
            await fs.promises.writeFile(this.nombre, JSON.stringify(objs), 'utf8');
            return id;
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
        }
    }

    async actualizar(newObj) {      
        try {
            const objs = await this.listarTodos();
            const index = objs.findIndex(obj => obj.id === newObj.id);
            if (index === -1) {
                throw new Error(`Error al actualizar: No se encontró el objeto con id ${newObj.id}`);
            }
            objs[index] = newObj;
            await fs.promises.writeFile(this.nombre, JSON.stringify(objs), 'utf8');
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }

    async borrar(id) {
        try {
            const objs = await this.listarTodos();
            const index = objs.findIndex(obj => obj.id === id);
            if (index === -1) {
                throw new Error(`Error al borrar: No se encontró el objeto con id ${id}`);
            }
            objs.splice(index, 1);
            await fs.promises.writeFile(this.nombre, JSON.stringify(objs), 'utf8');
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }

    async borrarTodo() {
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify([]), 'utf8');
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`);
        }
    }   
}

export default ContenedorArchivo;