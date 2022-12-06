const knex = require('knex');


class Contenedor {

    constructor(connection, workingTable) {

        this.workingTable = workingTable
        this.db = knex(connection)

        // Chequear si existe, si no crearla
        this.db.schema.hasTable(workingTable).then((exists) => {
            if (!exists) {
                this.db.schema.createTable(workingTable, (table) => {
                    table.increments('id').primary()
                    table.string('nombre').notNullable()
                    table.integer('timestamp').notNullable()
                    table.string('descripcion')
                    table.integer('código').notNullable()
                    table.integer('precio')
                    table.string('foto')
                    table.integer('stock').notNullable()
                })
                    .then(() => console.log('Creado con éxito'))
                    .catch((err) => console.log(err))
            }
        })
    }

    async save(obj) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

        // Por default Knex devuelve el 

        const newObjId = await this.db(this.workingTable)
            .insert(obj)
            .catch(err => console.log("save " + err))

        return newObjId

    }


    async getById(num) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está.

        return await this.db(this.workingTable)
            .select('*')
            .where('id', num)
            .catch(err => console.log("getById " + err))
    }

    async getAll() {
        // Devuelve un array con los objetos presentes en el archivo.
        return await this.db(this.workingTable).select('*')
            .catch((err) => console.log("getAll " + err))
    }

    async deleteById(num) {
        // Elimina del archivo el objeto con el id buscado.
        return await this.db(this.workingTable)
            .where({ id: num })
            .del()
            .catch(err => console.log("deleteById " + err))
    }

    async deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        await this.db.schema.dropTable(this.workingTable)
    }

    async updateById(idPasada, update) {
        // Recibe una actualización y la aplica

        // Traemos el objeto y lo actualizamos
        let obj = await this.getById(idPasada);

        if (!obj.error) {
            await this.db(this.workingTable)
                .where({ id: idPasada })
                .update(update)
                .catch(err => console.log("updateById " + err))

            return await this.getById(idPasada)
        } else if (obj.error) {
            return { error: 'Producto no encontrado por updateById' }
        }
    }
}
module.exports = Contenedor;
