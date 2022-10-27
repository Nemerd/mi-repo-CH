const fs = require("fs");
const express = require("express");
const PORT = 8080;


class Contenedor{
    
    constructor(route) {
        this.route = route;
        if (!fs.existsSync(this.route)){
            fs.writeFileSync(this.route, JSON.stringify([]), error => console.log(error))
        }
        this.encoding = 'utf-8';
        this.lastId = 0;
    }
    
    save(obj){
        /* Recibe un objeto, lo guarda en el archivo, devuelve el id asignado. */
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
        /* Recibe un id y devuelve el objeto con ese id, o null si no está. */
        try {
            let listOfObjects = []
            const file = fs.readFileSync(this.route, this.encoding)
            listOfObjects = [...JSON.parse(file)]
            return listOfObjects.find(i => i.id === num) || null; /* Object */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getById: ${error}`);
            return null;
        }
    }

    getAll(){
        /* Devuelve un array con los objetos presentes en el archivo. */
        try {
            return [...JSON.parse(fs.readFileSync(this.route, this.encoding))]; /* Object[] */
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.getAll: ${error}`)
        }
    }

    deleteById(num){
        /* Elimina del archivo el objeto con el id buscado. */
        try {
            const file = fs.readFileSync(this.route, this.encoding);
            const listOfObjects = JSON.parse(file);
            const deleteIndex = listOfObjects.findIndex(i => i.id === num);
            listOfObjects.splice(deleteIndex, 1);
            fs.writeFileSync(this.route, JSON.stringify(listOfObjects));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteById: ${error}`);
        }
    }

    deleteAll(){
        /* Elimina todos los objetos presentes en el archivo. */
        try {
            fs.writeFileSync(this.route, JSON.stringify([]));
        } catch (error) {
            console.log(`Ocurió un error en Contenedor.deleteAll: ${error}`);
        }
    }
}
const container = new Contenedor("./productos.json");

// Desafío 6
const server = express();

server.get("/productos", (request, response) => {
    // Devolver todos los productos
    response.send(JSON.stringify(container.getAll()));
})

server.get("/productoRandom", (request, response) => {
    // Crear un ID al azar con la cantidad de elementos en el archivo
    const randomId = Math.floor(Math.random() * 3) + 1;
    // Devolver el objeto con el ID al azar
    response.send(JSON.stringify(container.getById(randomId)));
})

server.listen(PORT);