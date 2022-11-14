// Desafío Motores de plantillas
const express = require("express");
const myRouter = require("./routers/products-handlebars");


const PORT = 8080;

const server = express();

// server.engine()

server.set("view engine", "pug")
server.set("views", __dirname + "/views/")

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", myRouter);

server.get("/", (req, res) => {
    res.render("main.pug")
})

server.use(express.static("public"))

server.listen(PORT);