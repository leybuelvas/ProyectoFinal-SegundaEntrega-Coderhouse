class ContenedorMemoria extends Contenedor {
    constructor() {
        super();
        this.memoria = [];
    }

    async listar(id) {
        try {
            let result = this.memoria.find(obj => obj.id == id);
            if (result) {
                return result;
            } else {
                return 'Error: No se encontró el documento';
            }
        } catch (error) {
            throw new error(`Error al listar por id: ${error}`);
        }
    }

    async listarTodos() {
        try {
            return this.memoria;
        } catch (error) {
            throw new error(`Error al listar todos: ${error}`);
        }
    }

    async guardar(newObj) {
        try {
            let id = this.memoria.length + 1;
            newObj.id = id;
            this.memoria.push(newObj);
            return id;
        } catch (error) {
            throw new error(`Error al guardar: ${error}`);
        }
    }


    async actualizar(newObj) {
        try {
            let index = this.memoria.findIndex(obj => obj.id == newObj.id);
            this.memoria[index] = newObj;
            return newObj;
        } catch (error) {
            throw new error(`Error al actualizar: ${error}`);
        }
    }

    async borrar(id) {
        try {
            let index = this.memoria.findIndex(obj => obj.id == id);
            this.memoria.splice(index, 1);
            return true;
        } catch (error) {
            throw new error(`Error al borrar: ${error}`);
        }
    }
}

export default ContenedorMemoria;





 