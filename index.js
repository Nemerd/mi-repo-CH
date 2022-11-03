const fs = require("fs");
const express = require("express");
const { response } = require("express");
const PORT = 8080;


class Contenedor{
    
    constructor(route) {
        this.route = route;
        // Chequear si existe, si no crearla
        if (!fs.existsSync(this.route)){
            fs.writeFileSync(this.route, JSON.stringify([]), error => console.log(error))
        }
        this.encoding = 'utf-8';
        this.lastId = 3;
    }
    
    save(obj){
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        let currentID = this.lastId +=1
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

    
    getById(num){
        // Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            let listOfObjects = []
            const file = fs.readFileSync(this.route, this.encoding)
            listOfObjects = [...JSON.parse(file)]
            return listOfObjects.find(i => i.id === parseInt(num)) || null; /* Object */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getById: ${error}`);
            return null;
        }
    }

    getAll(){
        // Devuelve un array con los objetos presentes en el archivo.
        try {
            return [...JSON.parse(fs.readFileSync(this.route, this.encoding))]; /* Object[] */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getAll: ${error}`)
        }
    }

    deleteById(num){
        // Elimina del archivo el objeto con el id buscado.
        try {
            const file = fs.readFileSync(this.route, this.encoding);
            const listOfObjects = JSON.parse(file);
            const deleteIndex = listOfObjects.findIndex(i => i.id === parseInt(num));
            listOfObjects.splice(deleteIndex, 1);
            fs.writeFileSync(this.route, JSON.stringify(listOfObjects));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteById: ${error}`);
        }
    }

    deleteAll(){
        // Elimina todos los objetos presentes en el archivo.
        try {
            fs.writeFileSync(this.route, JSON.stringify([]));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteAll: ${error}`);
        }
    }

    updateById(id, update){
        // Recibe una actualización y la aplica

        // Traemos el objeto y lo actualizamos
        let obj = this.getById(id);
        obj = { ...obj, ...update };

        // Abrimos el archivo y buscamos el index del elememento que tenemos que actualizar
        let file = [...JSON.parse(fs.readFileSync(this.route, this.encoding))];
        const modifyIndex = file.findIndex((i) => i.id === parseInt(id));
        // Modificamos el array que nos sirve de base de datos y escribimos las modificaciones
        file[modifyIndex] = obj;
        fs.writeFileSync(this.route, JSON.stringify(file));

        return obj;
    }
}
const container = new Contenedor("./productos.json");

// Desafío 6
const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.get("/productoRandom", (request, response) => {
    // Crear un ID al azar con la cantidad de elementos en el archivo
    const randomId = Math.floor(Math.random() * 3) + 1;
    // Devolver el objeto con el ID al azar
    response.json(container.getById(randomId));
});

server.get("/api/productos", (request, response) => {
    // Devolver todos los productos
    response.json(container.getAll());
});

server.get("/api/productos/:id", (request, response) => {
    // Devuelve un producto según su id
    const { id } = request.params;
    response.json(container.getById(id));
});

server.post("/api/productos", (request, response) => {
    // Recibe y agrega un producto, y lo devuelve con su id asignado
    /* container.save guarda el objeto y devuelve el id, que usamos para
     * acceder de nuevo y mandar el objeto. */
    response.json(container.getById(container.save(request.body)))
});

server.put("/api/productos/:id", (request, response) => {
    // Recibe y actualiza un producto según su id
    const { id } = request.params
    response.json(container.updateById(id, request.body))
});

server.delete("/api/productos/:id", (request, response) => {
    // Elimina un producto según su id
    const { id } = request.params;
    container.deleteById(id);
    response.json("Deleted")
});

server.listen(PORT);