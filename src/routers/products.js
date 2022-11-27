require('dotenv').config()
const { Router } = require("express");
const myRouter = Router();
const Contenedor = require("../libs/Container");
const fs = require("fs");

const container = new Contenedor(__dirname + "/../../mock/productos.json")
function isAdmin(req, res, next) {
    if (process.env.IS_ADMIN === "true") {
        console.log("Eres admin");
        next()
    } else {
        res.status(401).send({
            error: -1,
            descripcion: `ruta ${req.url} método ${req.method} no autorizada`
        })
        // next('route')
    }
}

myRouter.get("/", (request, response) => {
    // Devolver todos los productos
    response.json(container.getAll());
});

myRouter.get("/:id", (request, response) => {
    // Devuelve un producto según su id
    const { id } = request.params;
    response.json(container.getById(id));
});

myRouter.post("/", isAdmin, (request, response) => {
    // Recibe y agrega un producto, y lo devuelve con su id asignado
    /* container.save guarda el objeto y devuelve el id, que usamos para
     * acceder de nuevo y mandar el objeto. */
    response.json(container.getById(container.save(request.body)))
});

myRouter.put("/:id", isAdmin, (request, response) => {
    // Recibe y actualiza un producto según su id
    const { id } = request.params
    response.json(container.updateById(id, request.body))
});

myRouter.delete("/:id", isAdmin, (request, response) => {
    // Elimina un producto según su id
    const { id } = request.params;
    response.json(container.deleteById(id));
});

module.exports = myRouter;