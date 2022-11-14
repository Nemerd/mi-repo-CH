// Desafío Motores de plantillas
const express = require("express");
const myRouter = require("./routers/products-handlebars");
const handlebars = require("express-handlebars");


const PORT = 8080;

const server = express();

server.engine('hbs', handlebars.engine(
    {
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    }
))

server.set("view engine", "hbs")
server.set("views", __dirname + "/views/")

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", myRouter);

server.get("/", (req, res) => {
    res.render("main")
})

server.use(express.static("public"))

server.listen(PORT);