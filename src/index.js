const express = require("express");
const myRouter = require("./routers/users");
const PORT = 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", myRouter);

server.get("/productoRandom", (request, response) => {
    // Crear un ID al azar con la cantidad de elementos en el archivo
    const randomId = Math.floor(Math.random() * 3) + 1;
    // Devolver el objeto con el ID al azar
    response.json(container.getById(randomId));
});


server.listen(PORT);