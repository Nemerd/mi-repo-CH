require('dotenv').config()
const express = require("express");
const myRouter = require("./routers/products");
const cartRouter = require("./routers/cart")
const fs = require("fs")
const Contenedor = require("./libs/Container");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/productos", myRouter);
server.use("/api/carrito", cartRouter);
server.use((req, res, next) => {
    res.status(501).json({
        "error": -2,
        "descripcion": `ruta ${req.url} método ${req.method} no implementada`
    })
})

server.listen(process.env.PORT);
