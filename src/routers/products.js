const { Router } = require("express");
const myRouter = Router();
const Contenedor = require("../libs/Container");
const fs = require("fs");

const container = new Contenedor(__dirname + "/../../mock/productos.json")

myRouter.get("/", (request, response) => {
    // Devolver todos los productos
    response.json(container.getAll());
});

myRouter.get("/:id", (request, response) => {
    // Devuelve un producto según su id
    const { id } = request.params;
    response.json(container.getById(id));
});

myRouter.post("/", (request, response) => {
    // Recibe y agrega un producto, y lo devuelve con su id asignado
    /* container.save guarda el objeto y devuelve el id, que usamos para
     * acceder de nuevo y mandar el objeto. */
    response.json(container.getById(container.save(request.body)))
});

myRouter.put("/:id", (request, response) => {
    // Recibe y actualiza un producto según su id
    const { id } = request.params
    response.json(container.updateById(id, request.body))
});

myRouter.delete("/:id", (request, response) => {
    // Elimina un producto según su id
    const { id } = request.params;
    response.json(container.deleteById(id));
});

module.exports = myRouter;