require('dotenv').config()
const { Router } = require("express");
const myRouter = Router();
const Contenedor = require("../libs/Container.js");

const container = new Contenedor(
    {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            port: 3306,
            password: '',
            database: `eCommerce`
        }
    }, 'products')
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

myRouter.get("/", async (request, response) => {
    // Devolver todos los productos
    response.json(await container.getAll());
});

myRouter.get("/:id", async (request, response) => {
    // Devuelve un producto según su id
    const { id } = request.params;
    response.json(await container.getById(id));
});

myRouter.post("/", isAdmin, async (request, response) => {
    // Recibe y agrega un producto, y lo devuelve con su id asignado
    /* container.save guarda el objeto y devuelve el id, que usamos para
     * acceder de nuevo y mandar el objeto. */
    response.json(await container.getById(await container.save(request.body)))
});

myRouter.put("/:id", isAdmin, async (request, response) => {
    // Recibe y actualiza un producto según su id
    const { id } = request.params
    response.json(await container.updateById(id, request.body))
});

myRouter.delete("/:id", isAdmin, async (request, response) => {
    // Elimina un producto según su id
    const { id } = request.params;
    await container.deleteById(id) ? response.status(200).send() : response.status(500).send()
});

module.exports = myRouter;