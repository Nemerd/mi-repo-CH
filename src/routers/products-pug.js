// Desafío Motores de plantillas
const { Router } = require("express");
const myRouter = Router();
const Contenedor = require("../libs/Container");
const fs = require("fs");

const container = new Contenedor(__dirname + "/../../mock/productos.json")


myRouter.get("/productos", (request, response) => {
    response.render("list", { products: container.getAll() })
});

myRouter.post("/", (request, response) => {
    response.render("main.pug", { ...request.body })
});

module.exports = myRouter;