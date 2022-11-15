// Desafío Motores de plantillas
const express = require("express");
const myRouter = require("./routers/products-ejs");


const PORT = 8080;

const server = express();

server.set("view engine", "ejs")
server.set("views", __dirname + "/views/")

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", myRouter);

server.get("/", (req, res) => {
    res.render("main", { products: false })
})

server.use(express.static("public"))

server.listen(PORT);