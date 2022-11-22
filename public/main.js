// Desafío Websockets
const socket = io.connect();
const formulario = document.getElementById("changer")
const lista = document.getElementById("lista-de-productos")

socket.on('firtst-connection', data => {

    data.forEach(product => {

        const newTr = lista.insertRow()
        for (const attribute in product) {
            const newTd = newTr.insertCell()
            // newTd.id = `${attribute}-${product[id]}$`

            let tdElement;

            if (attribute != "thumbnail") {
                tdElement = document.createTextNode(product[attribute])
            } else {
                tdElement = document.createElement('img')
                tdElement.src = product[attribute]
            }
            newTd.appendChild(tdElement)
        }

    });

})

formulario.addEventListener('submit', evt => {
    evt.preventDefault()
    const newItem = {
        title: evt.target[1].value,
        price: parseInt(evt.target[2].value),
        thumbnail: evt.target[3].value,
        id: parseInt(evt.target[0].value)
    }
    socket.emit("upload", newItem)
})

socket.on('product-update', data => {

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    data.forEach(product => {

        const newTr = lista.insertRow()
        for (const attribute in product) {
            const newTd = newTr.insertCell()
            // newTd.id = `${attribute}-${product[id]}$`

            let tdElement;

            if (attribute != "thumbnail") {
                tdElement = document.createTextNode(product[attribute])
            } else {
                tdElement = document.createElement('img')
                tdElement.src = product[attribute]
            }
            newTd.appendChild(tdElement)
        }

    })
}
)