const fs = require("fs");

class Contenedor {

    constructor(route) {
        this.route = route;
        // Chequear si existe, si no crearla
        if (!fs.existsSync(this.route)) {
            fs.writeFileSync(this.route, JSON.stringify([]), error => console.log(error))
        }
        this.encoding = 'utf-8';
        this.lastId = 3;
    }

    save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        let currentID = this.lastId += 1
        const newObj = { ...obj, id: currentID };

        try {
            let file = [...JSON.parse(fs.readFileSync(this.route, this.encoding))];
            file.push(newObj);
            fs.writeFileSync(this.route, JSON.stringify(file));
            return currentID; /* Number */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.save: ${error}`);
        }
    }


    getById(num) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            let listOfObjects = []
            const file = fs.readFileSync(this.route, this.encoding)
            listOfObjects = [...JSON.parse(file)]
            return listOfObjects.find(i => i.id === parseInt(num))
                || { error: 'Producto no encontrado por getById' }; /* Object */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getById: ${error}`);
            return null;
        }
    }

    getAll() {
        // Devuelve un array con los objetos presentes en el archivo.
        try {
            return [...JSON.parse(fs.readFileSync(this.route, this.encoding))]; /* Object[] */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getAll: ${error}`)
        }
    }

    deleteById(num) {
        // Elimina del archivo el objeto con el id buscado.
        try {
            const file = fs.readFileSync(this.route, this.encoding);
            const listOfObjects = JSON.parse(file);
            const deleteIndex = listOfObjects.findIndex(i => i.id === parseInt(num));
            if (deleteIndex === -1) {
                return { error: 'Producto no encontrado' }
            }
            listOfObjects.splice(deleteIndex, 1);
            fs.writeFileSync(this.route, JSON.stringify(listOfObjects));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteById: ${error}`);
        }
    }

    deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        try {
            fs.writeFileSync(this.route, JSON.stringify([]));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteAll: ${error}`);
        }
    }

    updateById(id, update) {
        // Recibe una actualización y la aplica

        // Traemos el objeto y lo actualizamos
        let obj = this.getById(id);

        if (!obj.error) {

            for (const property in obj) {
                if (update[property] && property !== "id") {
                    obj[property] = update[property]
                }
            }

            console.log(obj);
            // obj = { ...obj, ...update };

            // Abrimos el archivo y buscamos el index del elememento que tenemos que actualizar
            let file = [...JSON.parse(fs.readFileSync(this.route, this.encoding))];
            const modifyIndex = file.findIndex((i) => i.id === parseInt(id));
            // Modificamos el array que nos sirve de base de datos y escribimos las modificaciones
            file[modifyIndex] = obj;
            fs.writeFileSync(this.route, JSON.stringify(file));

            return obj;
        } else if (obj.error) {
            return { error: 'Producto no encontrado por updateById' }
        }
    }
}
module.exports = Contenedor;
