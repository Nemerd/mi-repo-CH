const express = require("express");
const myRouter = require("./routers/products");
const { Server: SocketServer } = require("socket.io")
const { Server: HttpServer } = require("http")
const fs = require("fs")
const Contenedor = require("./libs/Container");

const container = new Contenedor(__dirname + "/../mock/productos.json")

const PORT = 8080;

const server = express();
const httpserver = new HttpServer(server)
const io = new SocketServer(httpserver)

// Desafío Websockets

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", myRouter);
server.use("/", express.static(__dirname + '/../public'))

io.on('connection', socket => {
    console.log("Nuevo cliente");
    socket.emit('firtst-connection',
        JSON.parse(fs.readFileSync(__dirname + "/../mock/productos.json", "utf-8")))
    socket.on("upload", item => {
        console.log(item.id)
        io.sockets.emit("product-update", container.updateById(item.id, item))
    })
})

httpserver.listen(PORT);