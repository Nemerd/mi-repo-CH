const express = require("express");
const myRouter = require("./routers/products");

const PORT = 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", myRouter);

server.listen(PORT);