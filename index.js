class Usuario {

    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(pet){
        this.mascotas.push(`${pet}`);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(name, author){
        this.libros.push(
            {
                nombre: `${name}`,
                autor: `${author}`
            }
        );
    }

    getBookNames(){
        let bookNames = [];
        this.libros.forEach(i => bookNames.push(i.nombre))
        return bookNames;
    }
}

const johnDoe = new Usuario("John", "Doe");

console.log(`Nombre completo: ${johnDoe.getFullName()}`);
johnDoe.addMascota(`Pichicho`);
johnDoe.addMascota(`Lala`);
console.log(`Mascotas totales: ${johnDoe.countMascotas()}`);
johnDoe.addBook(`Sandokán`, `Emilio Salgari`);
console.log(`Lista de libros: ${johnDoe.getBookNames()}`);