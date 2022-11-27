const { Router } = require("express")
const cartRouter = Router()
const Contenedor = require("../libs/Container")

const cart = new Contenedor(__dirname + "/../../mock/cart.json")
const products = new Contenedor(__dirname + "/../../mock/productos.json")


cartRouter.post("/", (request, response) => {
    // Crea un carrito y devuelve su id
    response.json(cart.save({ productos: [] }))
})
cartRouter.delete("/:id", (request, response) => {
    // Vacía un carrito y lo elimina
    const { id } = request.params
    response.json(cart.deleteById(id))
})
cartRouter.get("/:id/productos", (request, response) => {
    // Me permite listar todos los productos guardados en el carrito
    const { id } = request.params
    response.json(cart.getById(id))
})
cartRouter.post("/:id/productos", (request, response) => {
    // Para incorporar productos al carrito por su id de producto
    const { id } = request.params

    const cartInUse = cart.getById(id)
    cartInUse.productos.push(request.body)

    cart.updateById(id, cartInUse)
    response.end()
})
cartRouter.delete("/:id/productos/:id_prod", (request, response) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const { id, id_prod } = request.params

    const cartInUse = cart.getById(id)

    cartInUse.productos.splice(cartInUse.productos
        .findIndex(i => i.id === parseInt(id_prod)), 1)

    cart.updateById(id, cartInUse)
    response.end()
})

module.exports = cartRouter;