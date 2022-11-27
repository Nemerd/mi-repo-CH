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

server.listen(process.env.PORT);
